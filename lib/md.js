module.exports = md
module.exports.$config = { id: 'md' }

const brucedown = require('brucedown')
    , fs        = require('fs')
    , path      = require('path')

function md (file, callback) {
  fs.readFile(path.join(__dirname, '..', file), 'utf-8', function (err, content) {
    if (err) return callback(err)
    brucedown(content.toString(), callback)
  })
}