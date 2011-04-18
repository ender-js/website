//ENDER DOWNLOAD BUILDER LOGIC
var ender = require('ender')
  , fs = require ('fs')
  , path = require('path');


module.exports = function (req, res) {
  var name = './tmp/ender.' + (+new Date)
    , filepath = name + '.min.js';

  var cmd = sanitize(req.param('cmd'));
  if (!cmd) {
    return res.send('sorry, ' + req.param('cmd') + ' is an invalid build command. :/');
  }

  ender.exec(cmd, name, function () {
    res.download(path.join(__dirname, '..', filepath), 'ender.min.js', function (err) {
      if (err) throw err;
      var complete = 0
        , isComplete = function (err) {
            if (err) throw err;
            if (++complete == 2) {
              console.log('successfully deleted tmp files');
            }
        };
      fs.unlink(name + '.js', isComplete);
      fs.unlink(filepath, isComplete);
    });
  });
};


var validMethods = ['-b', '-a', '-j', 'build', 'async', 'just'];

function sanitize(cmd) {
  if (!cmd || (/[^\w\s0-9\-\@]/gi.test(cmd))) {
    return false;
  }
  var tokens = cmd.split(' '),
      method = tokens.shift();
  if (!method) {
    return false;
  }
  method = method.replace(/(^[\s\n]*)|([\s\n]*$)/, '');
  if (validMethods.indexOf(method) == -1) {
    return false;
  }
  if (!tokens) {
    return false;
  }
  tokens = tokens.join(',').replace(/\s|\,(?=\,)/g,'').split(',').filter(function(x){return x !== '';});
  if (!tokens.length) {
    return false;
  }
  return ['ender', method, tokens.join(',')].join(' ');
}