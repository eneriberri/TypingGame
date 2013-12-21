$(document).ready(function() {
  $('#type-box').focus();
  
  var prompt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + 
  "Mauris sed tortor imperdiet, ultrices est ut, auctor neque. In ligula lacus, " + 
  "faucibus non ante eget, malesuada semper odio. Pellentesque et quam id lorem " +
  "feugiat consectetur. Aenean tincidunt metus mi, sed lobortis elit sollicitudin et.";

  var promptArr = prompt.split("");
  promptArr.shift();
  promptArr.unshift("<span class='highlight'>" + prompt[0] + "</span>")
  $('.prompt').append(promptArr.join(""));
  
  //highlights prompt for each letter typed
  var i = 0;
  $('#type-box').keypress(function(event) 
  {  
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
      }
      else {
        promptArr[i] = "<span class='error'>" 
                       + promptArr[i] + "</span>";
      }  
    
      promptStr = promptArr.join("");
      $('.prompt').html(promptStr);
    }
  });
  
  $('.timer').text("00:00");
  var sec = 0;
  var min = 0;
  var timerId = window.setInterval(function() {     
    if(sec === 60) {
      sec = 0;
      min++;
    }
    var secStr = sec < 10 ? "0" + sec : "" + sec;
    $('.timer').text("0" + min + ":" + secStr); 
    sec++;
  }, 1000); 

  //if(true) window.clearInterval(timerId); //finished typing
});