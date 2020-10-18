import React, { Component } from 'react';
import InteractiveLayout from 'layouts/interactive';
import { setupCanvas, resize } from 'lib/interactive/canvas';
import {
  vecAdd,
  vecMulti,
  cubic,
  pixeltocord,
  dist,
} from 'lib/interactive/math';
import Matrix from 'lib/interactive/matrix';

var Bspline = [
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

class Bezier extends Component {
  constructor(props) {
    super(props);
    this.click = false;
    this.points = [
      [-0.9156118143459916, 0.17580872011251758, 0],
      [0.5921237693389592, 0.3853727144866385, 0],
      [0.5780590717299579, -0.3361462728551336, 0],
      [-0.12236286919831219, 0.10829817158931083, 0],
      [-0.4641350210970464, -0.18565400843881857, 0],
    ];
  }

  state = {
    fill: true,
    stroke: true,
    strokeColor: 'rgba(100, 100, 100, 100)',
    fillColor: 'rgba(200, 100, 100, 100)',
    openCurve: false,
    viewKeyPoints: false,
    pointDistance: 0.05,
    resolution: 20,
  };

  mountEditor = (pane) => {
    // pane.addInput(this.state, 'time', {
    //   min: 0,
    //   max: 1,
    // });
  };

  componentDidMount = () => {
    let canvas = document.getElementById('canvas');
    this.canvas = canvas;
    setupCanvas(canvas, this.draw, () => {}, true);
  };

  randomPoints = () => {
    var h = this.canvas.height,
      w = this.canvas.width,
      aspc = h / w;
    var points = [];
    for (var i = 0; i < 8; i++) {
      var p = [Math.random() - 0.5, Math.random() - 0.5, 0];
      points.push(p);
    }

    this.points = points;
  };

  randomStyle = () => {
    function randColor() {
      return Math.floor(Math.random() * 255);
    }
    this.setState((prev) => {
      return {
        ...prev,
        strokeStyle:
          'rgba(' +
          randColor() +
          ',' +
          randColor() +
          ',' +
          randColor() +
          ',' +
          1.0 +
          ')',
      };
    });
    this.setState((prev) => {
      return {
        ...prev,
        fillStyle:
          'rgba(' +
          randColor() +
          ',' +
          randColor() +
          ',' +
          randColor() +
          ',' +
          1.0 +
          ')',
      };
    });
  };

  handleClick = (w, h) => {
    let { canvas, click } = this;
    let { cursor } = canvas;
    let new_p = [cursor.x, cursor.y, 0];
    let norm = pixeltocord(w, h, new_p);

    if (cursor.z) {
      if (this.n === undefined) {
        var min = 100;
        for (var i = 0; i < this.points.length; i++) {
          var d = dist(norm, this.points[i]);
          if (d < this.pointDistance && d < min) {
            this.n = i;
            min = d;
          }
        }

        if (this.n === undefined) {
          var indx,
            min = 100;
          for (var i = 0; i < this.points.length; i++) {
            var next = (i + 1) % this.points.length,
              d = Math.abs(
                dist(this.points[i], norm) +
                  dist(norm, this.points[next]) -
                  dist(this.points[i], this.points[next])
              );
            if (d < min) {
              indx = i;
              min = d;
            }
          }
          this.points.splice(indx + 1, 0, norm);
        }
      }
    } else delete this.n;

    if (this.n !== undefined) {
      this.points[this.n] = norm;
    }
  };

  drawCurves(m, C, fill, stroke) {
    var i,
      n,
      p,
      cv,
      x,
      y,
      z,
      fl = 5,
      w = this.canvas.width,
      h = this.canvas.height,
      g = this.canvas.getContext('2d');
    let M = new Matrix();

    for (n = 0; n < C.length; n++) {
      cv = [];
      for (i = 0; i < C[n].length; i++) {
        p = M.transform(m, C[n][i]);

        x = p[0];
        y = p[1];
        z = p[2];

        x *= fl / (fl - z);
        y *= fl / (fl - z);

        x = w * x * 0.5 + 0.5 * w;
        y = -w * y * 0.5 + 0.5 * h;
        cv.push([x, y]);
      }

      g.beginPath();
      g.moveTo(cv[0][0], cv[0][1]);
      for (i = 1; i < cv.length; i++) g.lineTo(cv[i][0], cv[i][1]);
      console.log(fill, stroke);
      if (fill) g.fill();
      if (stroke) g.stroke();
    }
  }

  clearCanvas = () => (this.points = []);

  draw = (ctx, w, h) => {
    let M = new Matrix();
    let m = M.identityMatrix();
    this.handleClick(w, h);

    ctx.fillStyle = '#F6F8FA';
    ctx.fillRect(0, 0, w, h);

    if (this.points.length === 0) return;
    M.identity(m);
    M.save(m);
    var curves = [],
      curve,
      n,
      t;

    curve = [];
    for (n = 0; n < this.points.length; n++) {
      let nm = (n - 1 + this.points.length) % this.points.length,
        n1 = (n + 1) % this.points.length,
        n2 = (n + 2) % this.points.length,
        X = M.transform(Bspline, [
          this.points[nm][0],
          this.points[n][0],
          this.points[n1][0],
          this.points[n2][0],
        ]),
        Y = M.transform(Bspline, [
          this.points[nm][1],
          this.points[n][1],
          this.points[n1][1],
          this.points[n2][1],
        ]),
        Z = M.transform(Bspline, [
          this.points[nm][2],
          this.points[n][2],
          this.points[n1][2],
          this.points[n2][2],
        ]);

      for (t = 0; t < 1.0001; t += 1 / this.state.resolution)
        curve.push([cubic(X, t), cubic(Y, t), cubic(Z, t)]);
    }

    ctx.strokeStyle = this.state.strokeStyle;
    ctx.fillStyle = this.state.fillStyle;
    this.drawCurves(m, [curve], this.state.fill, this.state.stroke);

    if (this.state.viewKeyPoints) {
      // draw key points
      curves = [];
      for (n = 0; n < this.points.length; n++) {
        curve = [];
        for (t = 0; t < 2 * Math.PI; t += 1 / 10)
          curve.push([
            this.points[n][0] + 0.01 * Math.cos(t),
            this.points[n][1] + 0.01 * Math.sin(t),
            0,
          ]);
        curves.push(curve);
      }
      ctx.fillStyle = 'rgba(165, 165, 165, 200)';
      this.drawCurves(m, curves, true, false);

      // Draw lines between successive key points.

      curves = [];
      for (n = 0; n < this.points.length; n++)
        curves.push([
          this.points[n],
          this.points[(n + 1) % this.points.length],
        ]);
      ctx.strokeStyle = 'rgba(165, 165, 165, 200)';
      this.drawCurves(m, curves, false, true);

      // Draw the cursor
      var c = pixeltocord(w, h, [canvas.cursor.x, canvas.cursor.y, 0]),
        cx = c[0],
        cy = c[1];
      curves = [];
      curves.push([
        [cx - 0.05, cy],
        [cx + 0.05, cy],
      ]);
      curves.push([
        [cx, cy - 0.05],
        [cx, cy + 0.05],
      ]);
      ctx.strokeStyle = 'rgba(165, 165, 165, 200)';
      this.drawCurves(m, curves, false, true);
    }
    M.restore(m);
  };

  render = () => {
    return (
      <InteractiveLayout
        title="Editable Splines"
        mountEditor={this.mountEditor}
      />
    );
  };
}

export default Bezier;
