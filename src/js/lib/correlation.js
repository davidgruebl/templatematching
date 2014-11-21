'use strict'

var reduce = require('lodash.reduce')

var exports = module.exports = function(left, right) {
  var points = left.width * left.height
  left = exports.convertData(left)
  right = exports.convertData(right)

  var sumLeft = exports.sumData(left)
  var sumRight = exports.sumData(right)

  var squareLeft = exports.squareData(sumLeft)
  var squareRight = exports.squareData(sumRight)
  var square = exports.squareData(sumLeft, sumRight)

  var getStd = exports.getStd.bind(null, points)
  var getCovariance = exports.getCovariance.bind(null, points)

  var stdLeft = Math.sqrt(getStd(sumLeft, squareLeft))
  var stdRight = Math.sqrt(getStd(sumRight, squareLeft))
  var covariance = getCovariance(
    exports.sumCross(left, right),
    sumLeft,
    sumRight
  )

  return {
    value: covariance / stdLeft / stdRight,
    covariance: covariance,
    x: stdLeft,
    y: stdRight
  }
}

exports.convertData = function(data) {
  var output = []
  var rawData = data.data
  var points = data.width * data.height

  for (var i = 0; i < points; i+=4) {
    output.push({
      r: rawData[i],
      g: rawData[i+1],
      b: rawData[i+2]
    })
  }

  return output
}

exports.sumData = function(data) {
  return reduce(data, function(sum, data) {
    sum.r += data.r
    sum.g += data.g
    sum.b += data.b
    sum.r2 += data.r * data.r
    sum.g2 += data.g * data.g
    sum.b2 += data.b * data.b
    return sum
  }, {
    r: 0, g: 0, b: 0, r2: 0, g2: 0, b2: 0
  })
}

exports.sumCross = function(a, b) {
  return reduce(a, function(sum, data, idx) {
    sum.r += data.r * b[idx].r
    sum.g += data.g * b[idx].g
    sum.b += data.b * b[idx].b
    return sum
  }, {r: 0, g: 0, b: 0})
}


exports.squareData = function(a, b) {
  if (!b) b = a
  return {
    r: a.r * b.r,
    g: a.g * b.g,
    b: a.b * b.b
  }
}

exports.getStd = function(points, sum, square) {
  var points2 = Math.pow(points, 2)
  return sum.r2 / points +
    sum.g2 / points +
    sum.b2 / points -
    square.r / points2 -
    square.g / points2 -
    square.b / points2
}

exports.getCovariance = function(points, sumCross, sumLeft, sumRight) {
  var points2 = Math.pow(points, 2)
  return sumCross.r / points +
    sumCross.g / points +
    sumCross.b / points -
    sumLeft.r * sumRight.r / points2 -
    sumLeft.g * sumRight.g / points2 -
    sumLeft.b * sumRight.b / points2
}
