module.exports = function (callback) {
  this.md('HEAD.md', callback)
}

module.exports.__meta__ = {
    id      : 'head'
  , type    : 'factory'
  , async   : true
  , depends : [ 'md' ]
}