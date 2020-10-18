const vecMulti = (v, x) => {
  var t = [];
  for (var i in v) {
    t.push(v[i] * x);
  }
  return t;
};

const vecAdd = (v1, v2) => {
  var t = [];
  for (var i in v1) {
    t.push(v1[i] + v2[i]);
  }
  return t;
};

const cubic = (A, t) => A[0] * t * t * t + A[1] * t * t + A[2] * t + A[3];

const dist = (a, b) =>
  Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));

const p2c = (r, theta) => [r * Math.cos(theta), r * Math.sin(theta), 0];

const d2r = (theta) => (theta * Math.PI) / 180;

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

export {
  vecMulti,
  vecAdd,
  p2c,
  d2r,
  pixeltocord,
  cordtopixel,
  randInt,
  cubic,
  dist,
};
