module.exports = handler
module.exports.$config = {
    category : 'controller'
  , route    : '/'
  , depends  : [ 'mainContent', 'head', 'newsBuilder' ]
}

function handler (context, callback) {
  context.model.mainContent = this.mainContent
  context.model.newsContent = this.newsBuilder
  context.model.head        = this.head
  callback(null, 'index')
}