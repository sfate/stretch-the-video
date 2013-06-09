var Stretch = {
  selectors: ['embed#video_player', 'embed#movie_player', 'iframe#playerFrame'],
  object: null,
  iframeSrc: null,
  vkontakte: (document.domain=='vk.com'),

  init: function() {
    this.removeActionButton();
    this.addActionButton();

    $(document).keyup(function(e) {
      if (e.keyCode == 27) { Stretch.close(); }
    });
  },

  addActionButton: function() {
    $('body').prepend('<div id="stretch"></div>');
    $('#stretch').bind('click', function(){
      $('.fluid-width-video-wrapper').length ? Stretch.close() : Stretch.run();
    });
  },

  removeActionButton: function() {
    if ($('#stretch').length) {
      $('#stretch').unbind('click');
      $('#stretch').remove();
    }
  },

  run: function() {
    this.object = $('body').find(this.selectors.join(','))[0];
    var $object = $(this.object).clone();
    if (this.tagName === 'embed' && $object.parent('object').length || $object.parent('.fluid-width-video-wrapper').length) { return; }

    $(this.object).hide();
    var height = this.objectHeight,
        width = this.objectWidth,
        aspectRatio = height / width;
    var wrapper = $object.wrap('<div class="fluid-width-video-wrapper"></div>').parent();
    if (this.tagName() == 'iframe') {
      this.iframeSrc = $(this.object).attr('src');
      $object.css({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    if (this.vkontakte) {
      $object.css({
        'z-index': 9997,
        'top': $('body').scrollTop()
      });
    }
    $object.removeAttr('height').removeAttr('width');
    $('body').prepend(wrapper);
  },

  close: function() {
    $('.fluid-width-video-wrapper').remove();
    $(this.object).show();
    if (this.iframeSrc) {
      $(this.object).attr('src', this.iframeSrc);
      this.iframeSrc = null;
    }
    if (!this.playable()) { this.removeActionButton(); }
  },

  tagName: function() {
    return this.object.tagName.toLowerCase();
  },

  objectWidth: function() {
    var width = parseInt(this.object.width, 10);
    return isNaN(width) ? $(this.object).width() : width;
  },

  objectHeight: function() {
    var height = parseInt(this.object.height, 10);
    return isNaN(height) ? $(this.object).height() : height;
  },

  playable: function() {
    return ($(this.selectors.join(',')).length && parent==top);
  }
}

if ( Stretch.playable() ) {
  Stretch.init();
} else if (Stretch.vkontakte) {
  $("body").bind("DOMSubtreeModified", function() {
    if ( $('#mv_content').html() && $('#mv_content').html().length ) {
      if (Stretch.playable() && !$('#stretch').length) { Stretch.init(); }
    } else {
      Stretch.removeActionButton();
    }
  });
}

