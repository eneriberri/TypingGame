$(document).ready(function() {
  $('#type-box').focus();
  
  $('#type-box').keypress(function() 
  {  
    $('.prompt').toggleClass('highlight');
  
  });
});