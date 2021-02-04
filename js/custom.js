$(function () {
  $(document).scroll(function () {
    var $nav = $("#navbar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

$('#scroll-icon').mousedown(function(){
  timeout = setInterval(function(){
      window.scrollBy(0,765);
  }, 0);

  return false;
});

$(document).mouseup(function(){
  clearInterval(timeout);
  return false;
});