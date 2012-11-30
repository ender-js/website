module.exports = function (callback) {
  this.md('ENDER.md', callback)
}

module.exports.__meta__ = {
    id      : 'content'
  , type    : 'factory'
  , async   : true
  , depends : [ 'md' ]
}