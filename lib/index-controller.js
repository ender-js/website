var config = {
        category: 'controller'
      , route: '/'
      , depends: [ 'content', 'head' ]
    }

  , handler = function () {
      this.model.content = this.content
      this.model.head = this.head
      return 'index'
    }

module.exports = handler
module.exports.__meta__ = config