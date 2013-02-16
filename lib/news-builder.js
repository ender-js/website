const config = {
          id      : 'newsBuilder'
        , type    : 'factory'
        , async   : true
        , depends : [ ]
      }

const fs        = require('fs')
    , path      = require('path')
    , brucedown = require('brucedown')
    , newsDir   = path.join(__dirname, '../news')

var processOne = function (content, callback) {
      var json = ''

      content = content.split('\n')
      if (/^```/.test(content[0]))
        content.shift()
      if (!/^\{/.test(content[0]))
        return callback(new Error('Not a JSON header: ' + content[0]))
      while (content.length && !/^\}/.test(content[0]))
        json += content.shift()
      json += content.shift()
      if (content.length && /^```/.test(content[0]))
        content.shift()

      try {
        json = JSON.parse(json)
      } catch (e) {
        return callback(new Error('JSON error: ' + e))
      }

      brucedown(content.join('\n'), function (err, content) {
        if (err) return callback(err)
        callback(null, { spec: json, page: content })
      })
    }

  , processAll = function (contents, callback) {
      var r = 0
      contents.forEach(function (content, i) {
        processOne(content, function (err, data) {
          if (err) return callback(err) // derptastic
          contents[i] = data
          if (++r == contents.length) {
            contents = contents.sort(function (c1, c2) {
              return c1.spec.date < c2.spec.date
            })
            callback(null, contents)
          }
        })
      })
    }

  , load = function (files, callback) {
      var contents = []
      files.forEach(function (file) {
        fs.readFile(file, 'utf-8', function (err, content) {
          if (err) return callback(err) // derp, don't make this happen!
          contents.push(content.toString())
          if (contents.length == files.length)
            processAll(contents, callback)
        })
      })
    }

  , builder = function (callback) {
      fs.readdir(newsDir, function (err, list) {
        if (err) return callback(err)

        var files = []
          , r     = 0
        list.forEach(function (file) {
          file = path.join(newsDir, file)
          fs.stat(file, function (err, stat) {
            if (err) return callback(err) // derp, this will mess things right up
            if (stat.isFile())
              files.push(file)
            if (++r == list.length)
              load(files, callback)
          })
        })
      })
    }

module.exports = builder
module.exports.__meta__ = config