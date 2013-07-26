module.exports = function (callback) {
  this.md('ENDER.md', callback)
}

module.exports.$config = {
    id      : 'mainContent'
  , type    : 'factory'
  , async   : true
  , depends : [ 'md' ]
}