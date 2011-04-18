/* NAV CONTROL
==================*/

var nav = {

  $window: null,
  $nav: null,
  $buttons: null,
  fixed: false,
  activeSection: null,
  sections: [],
  sectionCoords: [],

  init: function () {
    this.$nav = $('#nav'), this.$buttons = $('nav a'), this.$window = $(window);
    for (var i = 0, l = this.$buttons.length; i < l; i++) {
      var button = this.$buttons[i],
          section = $(button).html();
      this.sections.push(section);
      section = $('#' + section)[0];
      section && this.sectionCoords.push(this.findPos(section).y - 20);
    }
    this.processScroll();
    this.addEvents();
  },

  addEvents: function () {
    $(window).on('scroll', this.processScroll);
    $('nav').on(this.$buttons, 'click', this.setButton);
  },

  setButton: function () {
    nav.$buttons.attr('class', '');
    $(this).addClass('yellow');
  },

  findPos: function (obj) {
    var curleft = curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
      return {x: curleft, y:curtop};
    }
  },

  processScroll: function (e) {
    var scrollTop = nav.$window.scrollTop(), i;
    for (i = nav.sectionCoords.length; i--;) {
      if (nav.activeSection != nav.sections[i]
          && scrollTop > nav.sectionCoords[i]
          && (!nav.sectionCoords[i + 1] || scrollTop < nav.sectionCoords[i + 1])) {
        nav.activeSection = nav.sections[i];
        nav.setButton.call(nav.$buttons[i]);
      }
    }
    if (scrollTop >= 485 && !nav.fixed) {
      nav.fixed = true;
      nav.$nav.css({ position: 'fixed',top: 0 });
    } else if (scrollTop <= 485 && nav.fixed) {
      nav.fixed = false;
      nav.$nav.attr('style', '');
    }
  }

};



/* BUILDER CONTROL
==================*/

var builder = {

  validMethods: ['-b', '-a', '-j', 'build', 'async', 'just'],
  $input: null,
  $form: null,
  $message: null,
  err: false,

  init: function () {
    this.$form = $('#download');
    this.$message = $('#message');
    this.$input = $("#download input");
    $('#download').on('submit', this.sanitize);
  },

  message: function (msg) {
    if (msg) {
      if (this.err) return;
      builder.err = true;
      builder.$form.addClass(/^great/i.test(msg) ? 'success' : 'error');
      builder.$message.html(msg);
      window.setTimeout(builder.message, 3000);
    } else {
      builder.err = false;
      builder.$form.removeClass('error');
      builder.$message.html('');
    }
  },

  sanitize: function (e) {
    var input = builder.$input;
    if (/[^\w\s0-9\-\@]/gi.test(input[0].value)) {
      e.preventDefault();
      return builder.message('no special characters pls.')
    }
    var tokens = input[0].value.split(' '),
        method = tokens.shift();
    if (!method) {
      e.preventDefault();
      return builder.message('please provide a valid ender build method');
    }
    method = method.replace(/(^[\s\n]*)|([\s\n]*$)/, '');
    if (builder.validMethods.indexOf(method) == -1) {
      e.preventDefault();
      return builder.message('please provide a valid ender build method');
    }
    if (!tokens) {
      e.preventDefault();
      return builder.message('please provide a valid npm token to build.')
    }
    tokens = tokens.join(',').replace(/\s|\,(?=\,)/g,'').split(',').filter(function(x){return x !== '';});
    if (!tokens.length) {
      e.preventDefault();
      return builder.message('please provide a valid npm token to build.')
    }
    builder.message('Great! your file will begin downloading momentarily!');
  }

}

$.domReady(function () {
  nav.init();
  builder.init();
});