'use strict'

module.exports = function(leftImageData, rightImageData) {
  var differenceCanvas = document.getElementById('difference')
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
    imageData[i - 3] = Math.abs(leftImageData.data[i - 3] - rightImageData.data[i - 3])
    imageData[i - 2] = Math.abs(leftImageData.data[i - 2] - rightImageData.data[i - 2])
    imageData[i - 1] = Math.abs(leftImageData.data[i - 1] - rightImageData.data[i - 1])
    imageData[i] = 255
  }
  //set new data
  differenceCtx.putImageData(differenceImage, 0, 0)
}
