import React, { Component } from 'react';
import { ExperimentLayout } from '../../components/layout';
import { setupCanvas } from '../../components/experiment';
import { BSpline, cubic, drawCurves } from '../../lib/shape-rendering';
import Matrix from '../../lib/matrix';
import { randInt, pixeltocord } from '../../lib/math';

function Ring(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.points = [];
  this.iterations = 0;

  for (var theta = 0; theta < 2 * Math.PI; theta += Math.PI / 20) {
    this.points.push([
      x + radius * Math.cos(theta),
      y + radius * Math.sin(theta),
      0,
    ]);
  }
}

class AdditiveSplines extends Component {
  constructor(props) {
    super(props);
    this.rings = [];
    this.maxIterations = 100;
    this.cursorRadius = 0.3;
    this.click = false;
    this.color = 'rgba(100, 200, 200, 0.1)';
    this.resolution = 60;
    this.varyPower = 0.02;
    this.M = new Matrix();
  }

  mountDatGUI = datgui => {
    datgui.addColor(this, 'color');
    datgui.add(this, 'maxIterations').step(1);
    datgui.add(this, 'cursorRadius', 0.2, 0.7);
    datgui.add(this, 'addRandom');
    datgui.add(this, 'clearCanvas');
    datgui.add(this, 'download');
    datgui.add(this, 'printColors');
  };

  componentDidMount = () => {
    let canvas = document.getElementById('canvas');
    setupCanvas(canvas, this.draw, this.resetIterations, false);
    this.addRandom();
    this.canvas = canvas;
  };

  printColors = () => {
    this.rings.map(r => console.log(r.color));
  };

  vary = path => {
    var newPoints = [];
    var points = path.points,
      varyPower = this.varyPower;

    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      newPoints.push([
        p[0] + path.radius * 2 * varyPower * (Math.random() * 2 - 1),
        p[1] + path.radius * 2 * varyPower * (Math.random() * 2 - 1),
        0,
      ]);
    }

    path.points = newPoints;

    return newPoints;
  };

  randomStyle = () =>
    `rgba(${randInt(0, 255)},${randInt(0, 255)},${randInt(0, 255)},0.1)`;

  handleClick = (w, h) => {
    let { canvas, click } = this;

    if (canvas.cursor.z && !click) {
      var pixel = pixeltocord(w, h, [canvas.cursor.x, canvas.cursor.y, 0]);
      this.rings.push(
        new Ring(pixel[0], pixel[1], this.cursorRadius, this.color)
      );
      this.click = true;
    } else this.click = false;
  };

  resetIterations = () => {
    for (var i = 0; i < this.rings.length; i++) this.rings[i].iterations = 0;
  };

  resetPoints = ring => {
    ring.points = [];
    var theta = ring.theta,
      y = ring.y,
      x = ring.x,
      radius = ring.radius;
    for (theta = 0; theta < 2 * Math.PI; theta += Math.PI / 20) {
      ring.points.push([
        x + radius * Math.cos(theta),
        y + radius * Math.sin(theta),
        0,
      ]);
    }
  };

  clearCanvas = () => {
    var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d');
    this.rings = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  addRandom = (n = 5) => {
    for (var i = 0; i < n; i++) {
      let style = this.randomStyle();
      this.rings.push(
        new Ring(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() + 0.2,
          style
        )
      );
    }
  };

  download = () => {
    var image = canvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.download =
      'additive-splines-' + Math.floor(new Date().getTime() / 100000) + '.png';
    link.href = image;
    link.click();
  };

  draw = (ctx, w, h) => {
    let { rings, maxIterations, resolution, M } = this;

    this.handleClick(w, h);

    var n, i, t;
    for (i = 0; i < rings.length; i++) {
      var p = rings[i];
      if (p.iterations >= maxIterations) continue;

      var curve = [];
      var path = this.vary(p);
      for (n = 0; n < path.length; n++) {
        let nm = (n - 1 + path.length) % path.length,
          n1 = (n + 1) % path.length,
          n2 = (n + 2) % path.length;
        let X = M.transform(BSpline, [
            path[nm][0],
            path[n][0],
            path[n1][0],
            path[n2][0],
          ]),
          Y = M.transform(BSpline, [
            path[nm][1],
            path[n][1],
            path[n1][1],
            path[n2][1],
          ]),
          Z = M.transform(BSpline, [
            path[nm][2],
            path[n][2],
            path[n1][2],
            path[n2][2],
          ]);

        for (t = 0; t < 1.0001; t += 1 / resolution)
          curve.push([cubic(X, t), cubic(Y, t), cubic(Z, t)]);
      }
      ctx.fillStyle = p.color;
      drawCurves(ctx, w, h, [curve]);
      if (Math.random() < 0.2) this.resetPoints(p);
      p.iterations += 1;
    }
  };

  render = () => {
    return (
      <ExperimentLayout
        title="Additive Splines"
        color="#4499d6"
        mountDatGUI={this.mountDatGUI}
      />
    );
  };
}

export default AdditiveSplines;
