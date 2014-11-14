'use strict'

var loaded = require('image-loaded')

var getImageData = require('./lib/imagedata')

var left = document.querySelector('#imgA')
var right = document.querySelector('#imgB')

require('run-parallel')([
  loaded.bind(null, left),
  loaded.bind(null, right),
], function() {
  require('./lib/differenceimage')(
    getImageData(left),
    getImageData(right)
  )
})
