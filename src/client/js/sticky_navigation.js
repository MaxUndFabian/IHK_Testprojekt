$(window).scroll(function() {
  if( $(this).scrollTop() > $('header').height()) {
    $("#navigation_wrapper").addClass("navigation_wrapper_fixed");
    $('header').addClass("header_margin");
  } else {
    $("#navigation_wrapper").removeClass("navigation_wrapper_fixed");
    $('header').removeClass("header_margin");
  }
});