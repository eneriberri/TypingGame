(function(root) {
  var ChatApp = root.ChatApp = root.ChatApp || {};
  
  var Prompt = ChatApp.Prompt = function() {
    this.wordsToType = "So amaze. Very mystery. My tail much improve. Flying. " +
                "Such growth. Cat awaits. Meow meow meow. Infinity. Wow.";
    this.arr = this.wordsToType.split(""); 
    this.mistakes = 0;
  }
  
  Prompt.prototype.displayPromptArr = function() {
    this.arr.shift();
    this.arr.unshift("<span class='highlight'>" + this.wordsToType[0] + "</span>");
    $('.prompt').append(this.arr.join(""));
  }
  
  Prompt.prototype.beginTimer = function() {
    var sec = 0, min = 0;
    this.timerId = window.setInterval(function() {     
      if(sec === 60) {
        sec = 0;
        min++;
      }
      var secStr = sec < 10 ? "0" + sec : "" + sec;
      $('.timer').text("0" + min + ":" + secStr); 
      sec++;
    }, 1000);  
    
    Prompt.REGX = /<\w+\s+\w+='\w+'>/;
    Prompt.REGX_END = /<\/\w+>/;
  }
  
  
  $(document).ready(function() {
    
    var prompt = new ChatApp.Prompt();
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
    
        prompt.arr[i] = prompt.arr[i].replace(Prompt.REGX, "").replace(Prompt.REGX_END, "");
    
        if(event.keyCode === prompt.wordsToType.charCodeAt(i)) {
          if(i !== prompt.arr.length - 1) {
            prompt.arr[i+1] = "<span class='highlight'>" 
                             + prompt.arr[i+1] + "</span>"; 
          }  
         
          i++;
        
          //if completed prompt, stop timer, show accuracy rate
          if(i === prompt.arr.length) { 
            window.clearInterval(prompt.timerId);
            var accuracy = Math.floor((1 - prompt.mistakes/prompt.wordsToType.length) * 100);
            $('.accuracy').html("<h3>" + accuracy + "% accuracy rate</h3>");
          }
        }
        else {
          prompt.arr[i] = "<span class='error'>" + prompt.arr[i] + "</span>";
          prompt.mistakes++;
        }  
    
        promptStr = prompt.arr.join("");
        $('.prompt').html(promptStr);
      }
    });

  });
  
})(this);
