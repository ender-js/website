module.exports = builder
module.exports.$config = {
    id      : 'newsBuilder'
  , type    : 'factory'
  , async   : true
  , depends : [ ]
}

const path      = require('path')
    , ssbl      = require('ssbl')
    , newsDir   = path.join(__dirname, '../news')

function builder (callback) {
  // start off by listing files in the news directory
  ssbl(newsDir, callback)
}