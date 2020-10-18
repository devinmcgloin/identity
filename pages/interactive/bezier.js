import React, { Component } from 'react';
import InteractiveLayout from 'layouts/interactive';
import { setupCanvas, resize } from 'lib/interactive/canvas';
import { vecAdd, vecMulti, pixeltocord, dist } from 'lib/interactive/math';
import Matrix from 'lib/interactive/matrix';

class Bezier extends Component {
  constructor(props) {
    super(props);
    this.click = false;
    this.points = [
      [-0.684887459807074, 0.02679528403001072, 0],
      [-0.23472668810289388, 0.7877813504823151, 0],
      [0.8220793140407288, 0.39764201500535906, 0],
      [0.5691318327974277, -0.5541264737406216, 0],
      [-0.38692390139335475, -0.5669882100750268, 0],
      [-0.5755627009646302, -0.17041800643086816, 0],
      [-0.27331189710610937, 0.08896034297963558, 0],
      [-0.067524115755627, 0.21114683815648447, 0],
      [0.04608788853161849, 0.031082529474812434, 0],
      [-0.02893890675241162, -0.11039657020364416, 0],
      [-0.09967845659163987, -0.1189710610932476, 0],
      [-0.10396570203644162, -0.08681672025723473, 0],
      [-0.09967845659163987, -0.05466237942122187, 0],
    ];
  }

  state = {
    showDetails: true,
    strokeColor: [100, 200, 200],
    lineWidth: 3,
    time: 0.4,
    pointDistance: 0.02,
    granularity: 70,
  };

  mountEditor = (pane) => {
    pane.addInput(this.state, 'time', {
      min: 0,
      max: 1,
    });
    pane.addInput(this.state, 'showDetails', {
      label: 'Show Details',
    });
    pane.addInput(this.state, 'granularity', { min: 5, max: 100 });
  };

  componentDidMount = () => {
    let canvas = document.getElementById('canvas');
    this.canvas = canvas;
    setupCanvas(canvas, this.draw, () => {}, true);
  };

  clearCanvas = () => (this.points = []);

  handleClick = (w, h) => {
    let { canvas, click } = this;
    let { cursor } = canvas;
    if (cursor.z && !click) {
      let new_p = [cursor.x, cursor.y, 0];

      let norm = pixeltocord(w, h, new_p),
        exists = false,
        index = -1;
      for (var i in this.points) {
        if (dist(norm, this.points[i]) < this.pointDistance) {
          exists = true;
          index = i;
        }
      }
      if (!exists) this.points.push(norm);
      this.click = true;
    } else this.click = false;
  };

  drawCurves(g, C, color) {
    var i,
      n,
      p,
      cv,
      x,
      y,
      z,
      fl = 5,
      w = this.canvas.width,
      h = this.canvas.height;

    let M = new Matrix();
    let m = M.identityMatrix();

    for (n = 0; n < C.length; n++) {
      var stk = color.map(function (x) {
          return Math.floor(x);
        }),
        style = 'rgb(' + stk[0] + ',' + stk[1] + ',' + stk[2] + ')';
      g.strokeStyle = style;
      color = color.map(function (x) {
        return x * (1 - 0.2);
      });

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
      g.stroke();
    }
  }

  nextInterpolation = (t, l) => {
    var pts = l,
      nextPoints = [];

    for (var i = 0; i < pts.length - 1; i++) {
      nextPoints.push(vecAdd(vecMulti(pts[i], 1 - t), vecMulti(pts[i + 1], t)));
    }

    return nextPoints;
  };

  genDetailedCurve = () => {
    var l = this.points,
      c = [],
      cv = [];
    while (l.length > 1) {
      cv.push(l);
      l = this.nextInterpolation(this.state.time, l);
    }
    c.push(l[0]);

    return cv;
  };

  genCurve = () => {
    var l = this.points,
      c = [];
    for (var t = 0.0; t < 1.001; t += 1 / this.state.granularity) {
      while (l.length > 1) {
        l = this.nextInterpolation(t, l);
      }
      c.push(l[0]);

      l = this.points;
    }
    return [c];
  };

  draw = (ctx, w, h) => {
    this.handleClick(w, h);

    ctx.fillStyle = '#F6F8FA';
    ctx.fillRect(0, 0, w, h);

    let { showDetails, strokeColor } = this.state;
    if (this.points.length <= 1) return;
    var c = this.genCurve();
    if (showDetails) {
      this.genDetailedCurve()
        .reverse()
        .map(function (x) {
          c.push(x);
        });
      c.push(this.points);
    }
    this.drawCurves(ctx, c, strokeColor);
  };

  render = () => {
    return (
      <InteractiveLayout
        title="Bezier"
        description="A simple visualization explaining how bezier curves operate."
        mountEditor={this.mountEditor}
      />
    );
  };
}

export default Bezier;
