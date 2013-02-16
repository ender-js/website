var config = {
        category : 'controller'
      , route    : '/'
      , depends  : [ 'mainContent', 'head', 'newsBuilder' ]
    }

  , handler = function () {
      this.model.mainContent = this.mainContent
      this.model.newsContent = this.newsBuilder
      this.model.head        = this.head
      return 'index'
    }

module.exports = handler
module.exports.__meta__ = config