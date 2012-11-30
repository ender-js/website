var md   = require('./md')

module.exports = function (callback) {
  md('ENDER.md', callback)
}

module.exports.__meta__ = {
    id: 'content'
  , type: 'factory'
  , async: true
}