module.exports = function (callback) {
  this.md('ENDER.md', callback)
}

module.exports.__meta__ = {
    id      : 'mainContent'
  , type    : 'factory'
  , async   : true
  , depends : [ 'md' ]
}