const path    = require('path')
    , Splinky = require('splinky')
    , isDev   = (/^dev/i).test(process.env.NODE_ENV)

// init swig with 'root' param, this isn't done by `consolidate` but required by
// swig if you want to reference templates from within templates
require('swig').init({ root: path.join(__dirname, 'views'), cache: !isDev })

var splinky = Splinky({ port: process.env.PORT || 3000 })
splinky.scan(path.join(__dirname, './lib'))
splinky.static({
    path       : path.join(__dirname, './public')
  , url        : '/'
  , cache      : isDev ? false : {}
})
splinky.views({
    path       : path.join(__dirname, './views')
  , suffix     : 'html'
  , processor  : 'swig'
})

splinky.listen()