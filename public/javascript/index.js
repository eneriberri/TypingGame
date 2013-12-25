$(document).ready(function() {
  
  var prompt = "So amaze. Very mystery. My tail much improve. Flying. " +
  "Such growth. Cat awaits. Meow meow meow. Infinity. Wow.";

  var promptArr = prompt.split("");
  promptArr.shift();
  promptArr.unshift("<span class='highlight'>" + prompt[0] + "</span>");
  $('.prompt').append(promptArr.join(""));
  
  
  //highlights prompt for each letter typed
  var i = 0;
  var mistakes = 0;
  var begin = true;
  var timerId = null;
  $('#type-box').keypress(function(event) 
  {  
    if(begin) {
      var sec = 0;
      var min = 0;
      timerId = window.setInterval(function() {     
        if(sec === 60) {
          sec = 0;
          min++;
        }
        var secStr = sec < 10 ? "0" + sec : "" + sec;
        $('.timer').text("0" + min + ":" + secStr); 
        sec++;
      }, 1000); 
      begin = false;
    }
    if(i !== promptArr.length) { //instead of this, unbind event
    
      var rgxSpan = /<\w+\s+\w+='\w+'>/;
      var rgxSpanEnd = /<\/\w+>/;
      promptArr[i] = promptArr[i].replace(rgxSpan, "").replace(rgxSpanEnd, "");
    
      if(event.keyCode === prompt.charCodeAt(i)) {
        if(i !== promptArr.length - 1) {
          promptArr[i+1] = "<span class='highlight'>" 
                           + promptArr[i+1] + "</span>"; 
        }  
         
        i++;
        
        //if completed prompt, stop timer, show accuracy rate
        if(i === promptArr.length) { 
          window.clearInterval(timerId);
          var accuracy = Math.floor((1 - mistakes/prompt.length) * 100);
          $('.accuracy').html("<h3>" + accuracy + "% accuracy rate</h3>");
        }
      }
      else {
        promptArr[i] = "<span class='error'>" + promptArr[i] + "</span>";
        mistakes++;
      }  
    
      promptStr = promptArr.join("");
      $('.prompt').html(promptStr);
    }
  });
  
  //new prompt
  $('.button').click(function() {
    promptArr = ["EH?", " ", "Yo."];
    promptArr.unshift("<span class='highlight'>" + promptArr[0][0] + "</span>");
    console.log(promptArr);
    $('.prompt').html(promptArr.join(""));
  })

});