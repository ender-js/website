var nav, buttons, fixed, sections = [], sectionCoords = [], activeSection;

function getScrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return {x:scrOfX, y:scrOfY};
}

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
  var scroll = getScrollXY(), i;

  for (i = sectionCoords.length; i--;) {
    if (activeSection != sections[i] && scroll.y > sectionCoords[i] && (!sectionCoords[i + 1] || scroll.y < sectionCoords[i + 1])) {
      activeSection = sections[i];
      setButton.call(buttons[i]);
    }
  }

  if (scroll.y >= 485 && !fixed) {
    fixed = true;
    nav.css({
      position: 'fixed',
      top: 0
    });
  } else if (scroll.y <= 485 && fixed) {
    fixed = false;
    nav.attr('style', '');
  }
}

function setButton() {
  buttons.attr('class', '');
  $(this).addClass('yellow');
}

//app stuff
$.domReady(function () {
  nav = $('#nav'), buttons = $('nav a');

  buttons.each(function (button) {
    var section = $(button).html();
    sections.push(section);
    section = $('#' + section)[0];
    section && sectionCoords.push(findPos(section).y - 20);
  })

  processScroll();
  $(window).bind('scroll', processScroll);
  $('nav').bind(buttons, 'click', setButton);

});