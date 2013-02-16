/*global $, WebFontConfig*/

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

  , navTop: null

  , fixed: null
  , activeSection: null

  , sections: null
  , sectionCoords: null

  /* LE APP METHODS
    ====================*/

  , init: function () {

      this.$nav        = $('#nav')
      this.$buttons    = $('#nav a:not(.alt)')
      this.$win        = $(window)
      this.$page       = $('#content .page')
      this.pages       = [ 'main', 'news' ]
      this.currentPage = 0

      this.measure()

      this.$win.bind('scroll', this.processScroll)
      this.$nav.delegate(this.$buttons, 'click', this.setButton)

      $('#nav a').on('click', function (e) {
        var href = $(e.currentTarget).attr('href')
          , ho

        if (!/^#/.test(href))
          return

        e.stop()

        href = href.substring(1)
        ho = $('#' + href).offset()

        App.scrollTo(ho.top + ho.height - 20)
        App.navTo(href)
      })
    }

  , measure: function () {
      var navPos = App.$nav.css('position')
        , navTop = App.$nav.css('top')
        , navOffset
        , section
        , sto
        , i = 0
        , l

      App.$nav.css({
          position: 'relative'
        , top: ''
      })
      navOffset         = App.$nav.offset()
      App.navTop        = navOffset.top
      App.sections      = []
      App.sectionCoords = []

      App.$nav.css('position', 'absolute')

      for (l = App.$buttons.length; i < l; i++) {
        App.sections.push($(App.$buttons[i]).html())
        if (section = document.getElementById(App.sections[i])) {
          sto = $(section).offset()
          App.sectionCoords.push(sto.top + sto.height - 25)
        }
      }

      App.$nav.css({
          position : navPos
        , top      : navTop
      })
      App.processScroll()
    }

  , navTo: function (page) {
      var io = this.pages.indexOf(page)
      if (io == -1)
        io = 0
      if (this.currentPage != io) {
        this.$page.removeClass(this.pages[this.currentPage])
        this.$page.addClass(this.pages[this.currentPage = io])
        if (io !== 0) {
          App.activeSection = null
          this.setButton.call($('nav a[href=#' + page + ']')[0])
        } else {
          this.processScroll()
        }
      }
    }

  , setButton: function () {
      $('nav a').attr('class', '')
      $(this).addClass('yellow')
    }

  , processScroll: function () {
      var scrollTop = App.$win.scrollTop()
        , i         = App.sectionCoords.length
        , isActive

      if (App.currentPage === 0) {
        for (; i--;) {
          isActive = App.activeSection != App.sections[i]
              && scrollTop > App.sectionCoords[i]
              && (!App.sectionCoords[i + 1] || scrollTop < App.sectionCoords[i + 1])

          if (isActive) {
            App.activeSection = App.sections[i]
            App.setButton.call($('nav a[href=#' + App.sections[i] + ']')[0])
          }
        }
      }

      if (scrollTop >= App.navTop && !this.fixed) {
        App.fixed = true
        App.$nav.css({
            position: 'fixed'
          , top: 0
        })
      } else if (scrollTop <= App.navTop && App.fixed) {
        App.fixed = false
        App.$nav.attr('style', '')
      }
    }

  , scrollTo: function (pos, callback) {
      var fn = function (t) { window.scrollTo(0, Math.round(t)) }
      $.tween(400, fn, callback, null, $(window).scrollTop(), pos)
    }
}

$.domReady(function () {
  App.init()
})

WebFontConfig._loaded = App.measure