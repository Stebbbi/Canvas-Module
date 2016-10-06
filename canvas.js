function Canvas(c, i) {
  this.c = canvas;
  this.ctx = this.c.getContext('2d');
  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx.drawImage(image, 0, 0, this.width, this.height);
  this.imgData = this.ctx.getImageData(0,0,this.width,this.height);
  this.data = this.imgData.data;
  this.putImageData = function() {this.ctx.putImageData(this.imgData,0,0);};
}

Canvas.prototype.getPixel = function (x, y) {
  var pixelPos = (y)*(4*this.width)+x*4;
  var red = this.data[pixelPos];
  var green = this.data[pixelPos+1];
  var blue = this.data[pixelPos+2];
  var alpha = this.data[pixelPos+3];

  function savePixel(pixel, c) {
    c.data[pixelPos] = pixel.red;
    c.data[pixelPos+1] = pixel.green;
    c.data[pixelPos+2] = pixel.blue;
    c.data[pixelPos+3] = pixel.alpha;
    c.imgData.data=c.data;

  }

  var cthis = this;
  var pixel = {
    pos:pixelPos,
    red:red,
    green:green,
    blue:blue,
    alpha:alpha,
    save:function() {
      savePixel(this, cthis);
    }
  };
  return pixel;
};

Canvas.prototype.setPixel = function (x, y, red, green, blue, alpha) {
  var pixelPos = (y)*(4*this.width)+x*4;
  this.data[pixelPos] = red;
  this.data[pixelPos+1] = green;
  this.data[pixelPos+2] = blue;
  this.data[pixelPos+3] = alpha;
  this.imgData.data=this.data;
  this.putImageData();
};

Canvas.prototype.fill = function (red, green, blue, alpha) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      p = this.getPixel(x, y);
      p.red = red;
      p.green = green;
      p.blue = blue;
      p.alpha = alpha;
      p.save();
    }
  }
  this.putImageData();
};
