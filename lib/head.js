var md   = require('./md')

module.exports = function (callback) {
  md('HEAD.md', callback)
}

module.exports.__meta__ = {
    id: 'head'
  , type: 'factory'
  , async: true
}