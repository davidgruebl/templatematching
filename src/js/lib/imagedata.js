'use strict'

var canvas = document.createElement('canvas')
canvas.width = 300
canvas.height = 300

var ctx = canvas.getContext('2d')

module.exports = function getImageData(image) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(image, 0, 0)
  return ctx.getImageData(0, 0, canvas.width, canvas.height)
}
