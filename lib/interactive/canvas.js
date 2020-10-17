const resize = (canvas, onResize) => {
  // Lookup the size the browser is displaying the canvas.
  var displayWidth = canvas.parentNode.clientWidth;
  var displayHeight = canvas.parentNode.clientHeight;

  // Check if the canvas is not the same size.
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;

    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';
    if (onResize) onResize();
  }

  return displayHeight / displayWidth;
};

const defineCanvasProperties = (canvas) => {
  canvas.cursor = {
    x: 0,
    y: 0,
    z: 0,
  };
  canvas.setCursor = function (x, y, z) {
    var r = this.getBoundingClientRect();
    this.cursor.x = x - r.left;
    this.cursor.y = y - r.top;
    if (z !== undefined) this.cursor.z = z;
  };
  canvas.onmousedown = function (e) {
    this.setCursor(e.clientX, e.clientY, 1);
  };
  canvas.onmousemove = function (e) {
    this.setCursor(e.clientX, e.clientY);
  };
  canvas.onmouseup = function (e) {
    this.setCursor(e.clientX, e.clientY, 0);
  };
};

const updateCanvas = (canvas, draw, onResize, clear) => {
  resize(canvas, onResize);
  let context = canvas.getContext('2d');
  if (clear) context.clearRect(0, 0, canvas.width, canvas.height);
  draw(context, canvas.width, canvas.height);
};

const setupCanvas = (
  canvas,
  draw,
  onResize,
  clear = true,
  refreshRate = 90
) => {
  defineCanvasProperties(canvas);
  if (typeof window !== 'undefined') {
    setInterval(() => updateCanvas(canvas, draw, onResize, clear), refreshRate);
  }
};

export { resize, defineCanvasProperties, updateCanvas, setupCanvas };
