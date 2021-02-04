// navbar background colour change on scroll

$(function () {
  $(document).scroll(function () {
    var $nav = $("#navbar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

// arrow down icon onclick scroll to tabs

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

// force site to scroll to top on load

$(document).ready(function() {
  $(this).scrollTop(0);
})