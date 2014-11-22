'use strict'

var correlation = require('./correlation')

var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d')

var exports = module.exports = function(image, data) {
  var template = document.querySelector('#template')
  var result = document.querySelector('#template-result')

  var templateData = exports.getImagePortion(image, 150, 120, 30, 30)

  template
    .getContext('2d')
    .putImageData(templateData, 0, 0)

  var bestMatch = {value: Infinity}

  for (var i = 0; i < data.width; i += 30)
    for (var j = 0; j < data.height; j += 30) {
      var match = exports.compareCorrelation(image, templateData, i, j)
      if (exports.toOne(bestMatch) > exports.toOne(match)) {
        bestMatch = match
        bestMatch.coords = {
          x: i,
          y: j
        }
      }
    }

  var resultCtx = result.getContext('2d')
  resultCtx.putImageData(data, 0, 0)
  resultCtx.strokeStyle = 'pink'
  resultCtx.strokeRect(
      bestMatch.coords.x,
      bestMatch.coords.y,
      templateData.width,
      templateData.height
    )
}

exports.getImagePortion = function(data, x, y, width, height) {
  canvas.width = width
  canvas.height = height

  ctx.drawImage(data, x, y, width, height, 0, 0, width, height)

  return ctx.getImageData(0, 0, width, height)
}

exports.compareCorrelation = function(image, template, x, y) {
  var section = exports.getImagePortion(image, x, y, template.width, template.height)

  return correlation(section, template)
}

exports.toOne = function(match) {
  return Math.abs(match.value - 1)
}
