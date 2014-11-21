'use strict'

var loaded = require('image-loaded')

var getImageData = require('./lib/imagedata')

var left = document.querySelector('#imgA')
var right = document.querySelector('#imgB')

require('run-parallel')([
  loaded.bind(null, left),
  loaded.bind(null, right),
], function() {
  var leftData = getImageData(left)
  var rightData = getImageData(right)

  require('./lib/differenceimage')(
    leftData,
    rightData
  )

  var correlation = require('./lib/correlation')(
    leftData,
    rightData
  )

  document.querySelector('#correlation').innerText = "\n"+
    "\nKorrelation: " + correlation.value +
    "\nKovarianz: " + correlation.covariance +
    "\nX: " + correlation.x +
    "\nY: " + correlation.y
})
