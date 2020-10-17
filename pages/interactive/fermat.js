import React, { Component } from 'react';
import InteractiveLayout from 'layouts/interactive';
import { setupCanvas } from 'lib/interactive/canvas';
import { renderCircle } from 'lib/interactive/shape-rendering';
import { d2r } from 'lib/interactive/math';

class FermatSpirals extends Component {
  state = {
    size: 2,
    color: '#e23232',
    scaling_factor: 0.009,
    angle: 137.508,
    count: 10000,
  };

  mountEditor = (pane) => {
    pane.addInput(this.state, 'size', { min: 1, max: 10 });
    pane.addInput(this.state, 'scaling_factor', { min: 0.001, max: 0.02 });
    pane.addInput(this.state, 'angle', { min: 0, max: 180 });
    pane.addInput(this.state, 'count', { min: 1, max: 20000 });
    pane.addInput(this.state, 'color');
  };

  componentDidMount = () => {
    let canvas = document.getElementById('canvas');

    setupCanvas(canvas, this.draw);
  };

  draw = (ctx, w, h) => {
    let { color, count, scaling_factor, angle, size } = this.state;
    ctx.fillStyle = color;
    for (var i = 0; i < count; i++) {
      let r = scaling_factor * Math.sqrt(i);
      let theta = i * angle;
      renderCircle(ctx, w, h, r, d2r(theta), size);
    }
  };

  render = () => {
    return (
      <InteractiveLayout
        title="Fermat's Spirals"
        description="See Fermat's spiral fill the screen, or tweak the angle to create your own spiral."
        color="#4499d6"
        mountEditor={this.mountEditor}
      />
    );
  };
}

export default FermatSpirals;
