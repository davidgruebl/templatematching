'use strict'

var getImageData = require('./lib/imagedata')

var differenceCanvas = document.getElementById('difference')
var leftImage = document.getElementById('imgA')
var leftcanvas = document.createElement('canvas')
leftcanvas.width = 300
leftcanvas.height = 300
var leftCtx = leftcanvas.getContext('2d')
leftCtx.drawImage(leftImage, 0, 0)
var rightImage = document.getElementById('imgB')
var rightcanvas = document.createElement('canvas')
rightcanvas.width = 300
rightcanvas.height = 300
var rightCtx = rightcanvas.getContext('2d')
rightCtx.drawImage(rightImage, 0, 0)
var leftImageObj = new Image()
var rightImageObj = new Image()
///pixel values
var leftImagedata
///pixel values
var rightImagedata
leftImageObj.onload = function () {
 /// erst hier ist das erste bild fertig geladen
 leftImagedata = getImageData(leftImageObj)
 rightImageObj.onload = function () {
   /// erst hier ist das zweite bild fertig geladen
   rightImagedata = getImageData(rightImageObj)
   differenceCanvas = document.getElementById('difference')
   var differenceCtx = differenceCanvas.getContext('2d')
   // get the image data object
   var differenceImage = differenceCtx.getImageData(0, 0, 300, 300)
   // get the image data values
   var imageData = differenceImage.data
   var gapSize = 0
   for (var i = 3; i < imageData.length; i += 4 + gapSize * 4) {
     /**
      * array access (rgba -> index 0,1,2,3 )
      * imageData[i-3] r
      * imageData[i-2] g
      * imageData[i-1] b
      * imageData[i]   a
      */
     imageData[i - 3] = Math.abs(leftImagedata.data[i - 3] - rightImagedata.data[i - 3])
     imageData[i - 2] = Math.abs(leftImagedata.data[i - 2] - rightImagedata.data[i - 2])
     imageData[i - 1] = Math.abs(leftImagedata.data[i - 1] - rightImagedata.data[i - 1])
     imageData[i] = 255
   }
   //set new data
   differenceCtx.putImageData(differenceImage, 0, 0)
 }
 rightImageObj.src = 'img/grass.jpg'
}
leftImageObj.src = 'img/butterfly.jpg'
