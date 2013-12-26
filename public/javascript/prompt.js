(function(root) {
  var ChatApp = root.ChatApp = root.ChatApp || {};
  
  var Prompt = ChatApp.Prompt = function(socket) {
    this.socket = socket;
    this.wordsToType = "So amaze. Very mystery. My tail much improve. Flying. " +
                "Such growth. Cat awaits. Meow meow meow. Infinity. Wow.";
    this.arr = this.wordsToType.split(""); 
    this.typos = 0;
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
  
})(this);
