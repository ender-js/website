var express = require('express')
  , fs = require('fs')
  , path = require('path')
  , stache = require('stache')
  , md = require('markdown-js')
  , ender = require('ender')
  , app = express.createServer();

//config
app.set('view engine', 'mustache')
app.set("views", __dirname + '/views');
app.register(".mustache", stache);
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

//routes
app.get('/', function (req, res) {
  fs.readFile('support/ender/README.md', 'utf-8', function (err, data) {
    if (err) throw err;
    res.render('index', {
      locals: {
        title: 'Ender - the no-library library.',
        content: md.markdown(data)
      },
    });
  });
});

app.get('/download', function (req, res) {
  var name = './tmp/ender.' + (+new Date)
    , filepath = name + '.min.js';

  ender.exec(req.param('cmd'), name, function () {
    res.download(path.join(__dirname, filepath), 'ender.min.js', function (err) {
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

});

//Run
app.listen(80);
console.log('Ender site started...')
