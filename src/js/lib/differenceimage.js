'use strict'

var map = require('lodash.map')

var exports = module.exports = function(left, right) {
  var difference = exports.difference.bind(null, left.data, right.data)

  var ctx = document
    .getElementById('difference')
    .getContext('2d')

  var image = ctx.getImageData(0, 0, 300, 300)

  // data[0] -> r, data[1] -> g, data[2] -> b, data[3] -> a
  // calculate difference except for alpha channel which is always 255
  image.data.set(map(image.data, function(point, idx) {
    if (!((idx+1)%4)) return 255
    return difference(idx)
  }))

  ctx.putImageData(image, 0, 0)
}

exports.difference = function(left, right, idx) {
  return Math.abs(left[idx] - right[idx])
}
