//Requires selector engine, events, dom untils (qwery, bean, bonzo)

var nav, buttons, fixed, sections = [], sectionCoords = [], activeSection;

function findPos(obj) {
  var curleft = curtop = 0;
  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return {x: curleft, y:curtop};
  }
}

function processScroll(e) {
  var scrollTop = $(window).scrollTop(), i;
  for (i = sectionCoords.length; i--;) {
    if (activeSection != sections[i] && scrollTop > sectionCoords[i] && (!sectionCoords[i + 1] || scrollTop < sectionCoords[i + 1])) {
      activeSection = sections[i];
      setButton.call(buttons[i]);
    }
  }
  if (scrollTop >= 485 && !fixed) {
    fixed = true;
    nav.css({ position: 'fixed',top: 0 });
  } else if (scrollTop <= 485 && fixed) {
    fixed = false;
    nav.attr('style', '');
  }
}

function setButton() {
  buttons.attr('class', '');
  $(this).addClass('yellow');
}

$.domReady(function () {
  nav = $('#nav'), buttons = $('nav a');

  for (var i = 0, l = buttons.length; i < l; i++) {
    var button = buttons[i],
        section = $(button).html();
    sections.push(section);
    section = $('#' + section)[0];
    section && sectionCoords.push(findPos(section).y - 20);
  }

  processScroll();
  $(window).bind('scroll', processScroll);
  $('nav').bind(buttons, 'click', setButton);

});