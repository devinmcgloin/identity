import { cordtopixel, p2c } from './math';

const renderCircle = (ctx, w, h, r, theta, s) => {
  var p = cordtopixel(w, h, p2c(r, theta));
  ctx.beginPath();
  ctx.arc(p[0], p[1], s, 0, Math.PI * 2, true);
  ctx.fill();
};

const BSpline = [
  -1 / 6,
  3 / 6,
  -3 / 6,
  1 / 6,
  3 / 6,
  -6 / 6,
  0,
  4 / 6,
  -3 / 6,
  3 / 6,
  3 / 6,
  1 / 6,
  1 / 6,
  0,
  0,
  0,
];

const cubic = (A, t) => {
  return A[0] * t * t * t + A[1] * t * t + A[2] * t + A[3];
};

const drawCurves = (ctx, w, h, C) => {
  var i,
    n,
    p,
    pix,
    x,
    y,
    z,
    fl = 5;

  // LOOP THROUGH CURVES.

  for (n = 0; n < C.length; n++) {
    // BUILD THE PROJECTED CURVE, POINT BY POINT.

    pix = [];
    for (i = 0; i < C[n].length; i++) {
      // TRANSFORM POINT

      x = C[n][i][0];
      y = C[n][i][1];
      z = C[n][i][2];
      if (z === undefined) z = 0;

      // DO PERSPECTIVE TRANSFORM

      x *= fl / (fl - z);
      y *= fl / (fl - z);

      // DO VIEWPORT TRANSFORM

      x = w * x * 0.5 + 0.5 * w;
      y = -w * y * 0.5 + 0.5 * h;
      pix.push([x, y]);
    }

    // DRAW THE PROJECTED CURVE ONTO THE CANVAS.
    for (i = 1; i < pix.length; i++) {
      ctx.beginPath();
      ctx.arc(pix[i][0], pix[i][1], 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};

export { renderCircle, drawCurves, cubic, BSpline };
