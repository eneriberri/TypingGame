(function(root){
  var ChatApp = root.ChatApp = (root.ChatApp || {});

  var escapeDivText = function(text) {
  	return $("<div class='chat-input'></div>").text(text);
  }
  
  var makeBar = function(progress) {
    var user = progress.user
    return $("<div data-user='" + user +
             "' class='progress' style='width: " +
             progress.text + "%';></div>");
  }

  var processInput = function(chat) {
  	var text = $('#send-message').val();
  	if(text[0] === '/'){
      chat.processCommand(text.slice(1));	  
  	} else {
    	chat.sendMessage(text); 
  	}
    $("#send-message").val('');
  }
  
  var calcProgress = function(chat, i, prompt, keyCode) {
    var progress = Math.floor(i/prompt.wordsToType.length*100);
    chat.sendProgress(progress);
    if (keyCode === 32) $("#type-box").val('');
  }

  var updateRoomList = function(roomData){
    $(".room-listings").empty();
    $.each(roomData, function(room, userList){
      if(room.length > 0){
        var roomListing = $("<div></div>").addClass("room-listing");
        roomListing.append("Users in " + room);
        var usersUL = $("<ul></ul>");
        $.each(userList, function(i, username){
          usersUL.append($("<li></li>").text(username));
        });
        roomListing.append(usersUL);
        $(".room-listings").append(roomListing); 
      }
    });
  }
  
  var finishedRace = function(prompt) {
    window.clearInterval(prompt.timerId);
    var accuracy = Math.floor((1 - prompt.typos/prompt.wordsToType.length) * 100);
    $('.accuracy').html("<h3>" + accuracy + "% accuracy rate</h3>");
  }

  $(document).ready(function() {
    var socket = io.connect();
  	var chat = new ChatApp.Chat(socket);
    
  	socket.on('message', function(message) {
  		var newElement = escapeDivText(message);
  		$("#chat-messages").append(escapeDivText(message.text));
  	});
    
  	socket.on('nicknameChangeResult', function(result) {
  	  if(result.success){
  	    $("#chat-messages").append(escapeDivText(result.text)); 
  	  }
  	});
    
  	socket.on('roomList', function(roomData){
  	  updateRoomList(roomData);
  	});
    
  	$('.send-form').submit(function(e) {
  		e.preventDefault();
  		processInput(chat);
  		return false;
  	});
    
    
    
    var prompt = new ChatApp.Prompt(socket);
    
    socket.on('startProgress', function(data) {
      var progress = { text: 0, user: data.user };
      console.log(progress);
      var bar = makeBar(progress);
      $("#progress-bars").append(bar);
    });
    
  	socket.on('typing', function(progress) {
      //find the progress bar assoc with the user
      //and replace it with updated progress bar
  		var bar = makeBar(progress);
      
      //loads prior users' progress bars
      //if the bar doesn't exist yet (meaning the obj is length 0)
      if($("[data-user='"+ progress.user + "']").length === 0) {
        $("#progress-bars").append(bar);
      }
      $("[data-user='"+ progress.user + "']").replaceWith(bar);
  	});
    
    prompt.displayPromptArr();
    
    //highlights prompt for each letter typed
    var i = 0, begin = true, timerId = null;
    $('#type-box').keypress(function(event) 
    {  
      if(begin) {
        prompt.beginTimer();
        begin = false;
      }
      
      if(i !== prompt.arr.length) { //instead of this, unbind event
    
        prompt.arr[i] = prompt.arr[i].replace(ChatApp.Prompt.REGX, "")
                        .replace(ChatApp.Prompt.REGX_END, "");
    
        if(event.keyCode === prompt.wordsToType.charCodeAt(i)) {
          
          calcProgress(chat, i, prompt, event.keyCode); //calculate progress bar for race
          
          if(i !== prompt.arr.length - 1) {
            prompt.arr[i+1] = "<span class='highlight'>" 
                             + prompt.arr[i+1] + "</span>"; 
          }  
         
          i++;
        
          //if completed prompt, stop timer, show accuracy rate
          if(i === prompt.arr.length) 
            finishedRace(prompt);         
        }
        
        else {
          prompt.arr[i] = "<span class='error'>" + prompt.arr[i] + "</span>";
          prompt.typos++;
        }  
    
        promptStr = prompt.arr.join("");
        $('.prompt').html(promptStr);
      }
    });
    
  });
})(this);