$(document).ready(function() {
  $('#type-box').focus();
  
  var prompt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + 
  "Mauris sed tortor imperdiet, ultrices est ut, auctor neque. In ligula lacus, " + 
  "faucibus non ante eget, malesuada semper odio. Pellentesque et quam id lorem " +
  "feugiat consectetur. Aenean tincidunt metus mi, sed lobortis elit sollicitudin et.";

  var promptArr = prompt.split("");
  promptArr.shift();
  promptArr.unshift("<span class='highlight'>" + "L" + "</span>")
  $('.prompt').append(promptArr.join(""));
  
  var i = 0;
  $('#type-box').keypress(function(event) 
  {  
    var rgxSpan = /<\w+\s+\w+='\w+'>/;
    var rgxSpanEnd = /<\/\w+>/;
    var str = promptArr[i];
    str = str.replace(rgxSpan, "");
    str = str.replace(rgxSpanEnd, "");
    
    if(event.keyCode === prompt.charCodeAt(i)) {
      promptArr[i] = str;

      promptArr[i+1] = "<span class='highlight'>" + promptArr[i+1] + "</span>";
      promptStr = promptArr.join("");
      $('.prompt').html(promptStr);
    
      i++;
    }
    else {
      promptArr[i] = str;
      promptArr[i] = "<span class='error'>" + promptArr[i] + "</span>";
      promptStr = promptArr.join("");
      $('.prompt').html(promptStr);
      // $('.prompt').addClass('highlight-error');
      // $('.prompt').removeClass('highlight');
    }  
  });
});