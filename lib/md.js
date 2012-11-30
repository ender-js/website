var brucedown = require('brucedown')
  , fs        = require('fs')
  , path      = require('path')

module.exports = function (file, callback) {
  fs.readFile(path.join(__dirname, '..', file), 'utf-8', function (err, content) {
    if (err) return callback(err)
    brucedown(content.toString(), callback)
  })
}

module.exports.__meta__ = { id: 'md' }