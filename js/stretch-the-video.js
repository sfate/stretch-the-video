if ($("object, embed").length) {
  $('body').prepend('<div id="stretch"></div>');
  $('#stretch').bind('click', function(){
    if ($('.fluid-width-video-wrapper').length) {
      $('.fluid-width-video-wrapper').remove();
    } else {
      $("body").fitVids();
    }
  });
  $(document).keyup(function(e) {
    if (e.keyCode == 27) { $('.fluid-width-video-wrapper').remove(); }
  });
}
