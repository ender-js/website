module.exports = function (callback) {
  this.md('HEAD.md', callback)
}

module.exports.$config = {
    id      : 'head'
  , type    : 'factory'
  , async   : true
  , depends : [ 'md' ]
}