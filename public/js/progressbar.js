
let COREHTML5 = COREHTML5 || {}

COREHTML5.Progressbar = function(div, strokeStyle, red, green, blue) {
  this.domElement = document.createElement('div');
  this.context = document.createElement('canvas').getContext('2d');
  this.domElement.appendChild(this.context.canvas);
  div.appendChild(this.domElement);
  let w = div.offsetWidth;
  let h = div.offsetHeight;
  this.context.canvas.width = w; // On each end, corner radius = h/2
  this.context.canvas.height = h;

  this.setProgressbarProperties(w, h);

  this.background.globalAlpha = 0.3;
  this.drawToBuffer(this.background, strokeStyle, red, green, blue);
  this.drawToBuffer(this.foreground, strokeStyle, red, green, blue);

  this.percentComplete = 0;
  return this;
}

COREHTML5.Progressbar.prototype = {
  LEFT: 0,
  TOP: 0,

  setProgressbarProperties: function(w, h) {
    this.w = w;
    this.h = h;
    this.cornerRadius = this.h / 2,
      this.right = this.LEFT + this.w,
      this.bottom = this.TOP + this.h;

    this.background = document.createElement('canvas').getContext('2d'),
      this.foreground = document.createElement('canvas').getContext('2d'),

      this.background.canvas.width = w + h; // On each end, corner radius = h/2
    this.background.canvas.height = h;

    this.foreground.canvas.width = w + h; // On each end, corner radius = h/2
    this.foreground.canvas.height = h;
  },

  draw: function(percentComplete) {
    this.erase();
    this.context.drawImage(this.background.canvas, 0, 0);

    if (percentComplete > 0) {
      this.context.drawImage(this.foreground.canvas, 0, 0,
        this.foreground.canvas.width * (percentComplete / 100),
        this.foreground.canvas.height,
        0, 0,
        this.foreground.canvas.width * (percentComplete / 100),
        this.foreground.canvas.height);
    }
  },

  drawToBuffer: function(context, strokeStyle, red, green, blue) {
    context.save();

    context.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    context.strokeStyle = strokeStyle;

    context.beginPath();

    context.moveTo(this.LEFT + this.cornerRadius, this.TOP);
    context.lineTo(this.right - this.cornerRadius, this.TOP);

    context.arc(this.right - this.cornerRadius,
      this.TOP + this.cornerRadius, this.cornerRadius, -Math.PI / 2, Math.PI / 2);

    context.lineTo(this.LEFT + this.cornerRadius,
      this.TOP + this.cornerRadius * 2);

    context.arc(this.LEFT + this.cornerRadius,
      this.TOP + this.cornerRadius, this.cornerRadius, Math.PI / 2, -Math.PI / 2);

    context.fill();

    context.shadowColor = undefined;

    let gradient = context.createLinearGradient(this.LEFT, this.TOP, this.LEFT, this.bottom);
    gradient.addColorStop(0, 'rgba(255,255,255,0.4)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.7)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0.1)');
    context.fillStyle = gradient;
    context.fill();

    context.lineWidth = 0.4;
    context.stroke();

    context.restore();
  },

  erase: function() {
    this.context.clearRect(this.LEFT, this.TOP, this.context.canvas.width, this.context.canvas.height);
  }
};
export {
  COREHTML5
};