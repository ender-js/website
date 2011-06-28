/**
  * @FAT + @DED
  * APP SINGLETON CONTR.
  * LICENSE MIT
  * ====================
  */

var App = {

  /* LE APP VARS
    ====================*/

    $nav: null
  , $win: null
  , $buttons: null

  , fixed: null
  , activeSection: null

  , sections: []
  , sectionCoords: []


  /* LE APP METHODS
    ====================*/

  , init: function () {
      var section, i;

      this.$nav = $('#nav');
      this.$buttons = $('#nav a');
      this.$win = $(window);

      for (i = 0, l = this.$buttons.length; i < l; i++) {
        this.sections.push($(this.$buttons[i]).html());
        section = document.getElementById(this.sections[i]);
        section && this.sectionCoords.push(this.findPos(section).y - 20);
      }

      this.processScroll();

      this.$win.bind('scroll', this.processScroll);
      this.$nav.delegate(this.$buttons, 'click', this.setButton);
    }

  , setButton: function (e) {
      App.$buttons.attr('class', '');
      $(this).addClass('yellow');
    }

  , findPos: function (element) {
      var curleft = curtop = 0;
      if (!element.offsetParent) return;
      do {
        curleft += element.offsetLeft;
        curtop += element.offsetTop;
      } while (element = element.offsetParent);
      return { x: curleft, y: curtop };
    }

  , processScroll: function (e) {
      var i, scrollTop = App.$win.scrollTop();

      for (i = App.sectionCoords.length; i--;) {
        var isActive = App.activeSection != App.sections[i]
            && scrollTop > App.sectionCoords[i]
            && (!App.sectionCoords[i + 1] || scrollTop < App.sectionCoords[i + 1]);

        if (isActive) {
          App.activeSection = App.sections[i];
          App.setButton.call(App.$buttons[i]);
        }
      }

      if (scrollTop >= 485 && !this.fixed) {
        App.fixed = true;
        App.$nav.css({ position: 'fixed'
        , top: 0
        });
      } else if (scrollTop <= 485 && App.fixed) {
        App.fixed = false;
        App.$nav.attr('style', '');
      }
    }

};

$.domReady(function () {
  App.init();
});