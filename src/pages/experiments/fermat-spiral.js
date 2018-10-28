import React, { Component } from 'react';
import { ExperimentLayout } from '../../components/layout';
import { setupCanvas } from '../../components/experiment';
import { renderCircle } from '../../shape-rendering';
import { d2r } from '../../math';
import '../../style/datgui.css';
import dat from 'dat.gui';

class FermatSpirals extends Component {
  state = {
    size: 2,
    color: '#e23232',
    scaling_factor: 0.009,
    angle: 137.508,
    count: 10000,
  };

  componentDidMount = () => {
    this.datgui = new dat.GUI({ autoPlace: false });
    this.datgui.add(this.state, 'size', 1, 10);
    this.datgui.add(this.state, 'scaling_factor', 0.001, 0.02);
    this.datgui.add(this.state, 'angle', 0, 180);
    this.datgui.add(this.state, 'count', 1, 20000);
    this.datgui.addColor(this.state, 'color');

    let dat_gui = document.getElementById('dat-gui');
    dat_gui.appendChild(this.datgui.domElement);

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
    return <ExperimentLayout title="Fermat's Spirals" color="#4499d6" />;
  };
}

export default FermatSpirals;
