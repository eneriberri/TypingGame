$(document).ready(function() {
  $('#type-box').focus();
  $('.timer').text("00:00");
  var sec = 0;
  window.setInterval(function() {     
    if(sec === 60) sec = 0;
    var secStr = sec < 10 ? "0" + sec : "" + sec;
    $('.timer').text("00:" + secStr); 
    sec++;
  }, 1000);

  
  
  var prompt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + 
  "Mauris sed tortor imperdiet, ultrices est ut, auctor neque. In ligula lacus, " + 
  "faucibus non ante eget, malesuada semper odio. Pellentesque et quam id lorem " +
  "feugiat consectetur. Aenean tincidunt metus mi, sed lobortis elit sollicitudin et.";

  var promptArr = prompt.split("");
  promptArr.shift();
  promptArr.unshift("<span class='highlight'>" + prompt[0] + "</span>")
  $('.prompt').append(promptArr.join(""));
  
  
  var i = 0;
  $('#type-box').keypress(function(event) 
  {  
    if(i !== promptArr.length - 1) { //unbind event
    
      var rgxSpan = /<\w+\s+\w+='\w+'>/;
      var rgxSpanEnd = /<\/\w+>/;
      promptArr[i] = promptArr[i].replace(rgxSpan, "").replace(rgxSpanEnd, "");
    
      if(event.keyCode === prompt.charCodeAt(i)) {
        promptArr[i+1] = "<span class='highlight'>" 
                         + promptArr[i+1] + "</span>";    
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
});