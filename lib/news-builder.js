const config = {
          id      : 'newsBuilder'
        , type    : 'factory'
        , async   : true
        , depends : [ ]
      }

const path      = require('path')
    , ssbl      = require('ssbl')
    , newsDir   = path.join(__dirname, '../news')

  , builder = function (callback) {
      // start off by listing files in the news directory
      ssbl(newsDir, callback)
    }

module.exports = builder
module.exports.__meta__ = config