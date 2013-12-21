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
    if(event.keyCode === prompt.charCodeAt(i)) {
      
      var rgxSpan = /<\w+\s+\w+='\w+'>/;
      var rgxSpanEnd = /<\/\w+>/;
      var str = promptArr[i];
      console.log(str);
      str = str.replace(rgxSpan, "");
      str = str.replace(rgxSpanEnd, "");
      console.log("after " + str);
      promptArr[i] = str;
      // promptArr[i] = "<span class='highlight'>" + promptArr[i] + "</span>";
      promptArr[i+1] = "<span class='highlight'>" + promptArr[i+1] + "</span>";
      promptStr = promptArr.join("");
      $('.prompt').html(promptStr);
    
      // $('.prompt').addClass('highlight');
      // $('.prompt').removeClass('highlight-error');
      i++;
    }
    else {
      // $('.prompt').addClass('highlight-error');
      // $('.prompt').removeClass('highlight');
    }  
  });
});