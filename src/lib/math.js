const p2c = (r, theta) => [r * Math.cos(theta), r * Math.sin(theta), 0];

const d2r = theta => (theta * Math.PI) / 180;

const pixeltocord = (w, h, p) => {
  var x = p[0],
    y = p[1],
    z = p[2],
    fl = 5;
  x = (2 * x) / w - 1;
  y = (h - 2 * y) / w;
  x = x - (x * z) / fl;
  y = y - (y * z) / fl;
  return [x, y, 0];
};

const cordtopixel = (w, h, c) => {
  var x = c[0],
    y = c[1],
    z = c[2],
    fl = 5;

  x *= fl / (fl - z);
  y *= fl / (fl - z);

  x = w * x * 0.5 + 0.5 * w;
  y = -w * y * 0.5 + 0.5 * h;
  return [x, y, 0];
};

const randInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export { p2c, d2r, pixeltocord, cordtopixel, randInt };
