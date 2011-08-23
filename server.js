var express = require('express')
  , fs = require('fs')
  , stache = require('stache')
  , md = require('markdown-js')
  , app = express.createServer()
  , homePage = md.markdown(fs.readFileSync('ENDER.md', 'utf-8'))

//config
app.configure(function () {
  app.set('view engine', 'mustache')
  app.set("views", __dirname + '/views')
  app.register(".mustache", stache)
  app.use(express.static(__dirname + '/public'))
})

//routes
app.get('/', function (req, res) {
  res.render('index', {
    locals: {
        title: 'Ender - the no-library library.'
      , content: homePage
    }
  })
})

//Run
app.listen(process.env.PORT || 3000)
console.log('Ender site started...')
