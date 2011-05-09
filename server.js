var express = require('express')
  , fs = require('fs')
  , stache = require('stache')
  , md = require('markdown-js')
  , app = express.createServer();

//config
app.set('view engine', 'mustache')
app.set("views", __dirname + '/views');
app.register(".mustache", stache);
app.use(express.static(__dirname + '/public'));

//routes
app.get('/', function (req, res) {
  fs.readFile('ENDER.md', 'utf-8', function (err, data) {
    if (err) throw err;
    res.render('index', {
      locals: {
        title: 'Ender - the no-library library.',
        content: md.markdown(data)
      },
    });
  });
});

//Run
app.listen(3000);
console.log('Ender site started...')
