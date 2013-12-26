(function(root){
  var ChatApp = root.ChatApp = (root.ChatApp || {});

  var escapeDivText = function(text) {
  	return $("<div></div>").text(text);
  }
  
  var makeBar = function(progress) {
    return $("<div class='progress' style='width: " + progress.text + "%';></div>");
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
  
  var calcProgress = function(chat, i, prompt) {
    var progress = Math.floor(i/prompt.wordsToType.length*100);
    chat.sendProgress(progress);
  }

  var updateRoomList = function(roomData){
    $(".room-listings").empty();
    $.each(roomData, function(room, userList){
      if(room.length > 0){
        var roomListing = $("<div></div>").addClass("room-listing");
        roomListing.append($("<h3></h3>").text(room));
        var usersUL = $("<ul></ul>");
        $.each(userList, function(i, username){
          usersUL.append($("<li></li>").text(username));
        });
        roomListing.append(usersUL);
        $(".room-listings").append(roomListing); 
      }
    });
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
    
  	socket.on('typing', function(progress) {
  		var bar = makeBar(progress);
      $("#progress-bars").html(bar);
  		// $("#chat-messages").html(escapeDivText(progress.text));
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
          
          calcProgress(chat, i, prompt); //calculate progress bar for race
          
          if(i !== prompt.arr.length - 1) {
            prompt.arr[i+1] = "<span class='highlight'>" 
                             + prompt.arr[i+1] + "</span>"; 
          }  
         
          i++;
        
          //if completed prompt, stop timer, show accuracy rate
          if(i === prompt.arr.length) { 
            window.clearInterval(prompt.timerId);
            var accuracy = Math.floor((1 - prompt.typos/prompt.wordsToType.length) * 100);
            $('.accuracy').html("<h3>" + accuracy + "% accuracy rate</h3>");
          }
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