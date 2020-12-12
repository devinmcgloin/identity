import React, { Component } from 'react';
import InteractiveLayout from 'layouts/interactive';
import { setupCanvas, resize } from 'lib/interactive/canvas';
import SimplexNoise from 'simplex-noise';

class Sunset extends Component {
  state = {
    simplex: new SimplexNoise(),
    frequency: 1.4,
    magnitude: 0.2,
    independence: 0.1,
    spacing: 0.04,
    count: 162,
    colors: [
      '#002F40', // Dark Blue
      '#005F73', // Medium Blue
      '#00ACB9', // Light Blue
      '#664D5C', // Dull Red
      '#BC6A60', // Medium Red
      '#D9A8AF', // Light Red
      '#EB783C', // Medium Orange
      '#FFA051', // Light Orange
      '#FECA55', // Yellow
    ],
  };

  componentDidMount = () => {
    let canvas = document.getElementById('canvas');
    this.canvas = canvas;
    setupCanvas(canvas, this.draw, (ctx, w, h) => {
      ctx.fillStyle = '#002F40';
      ctx.fillRect(0, 0, w, h);
    });
  };

  mountEditor = (pane) => {
    pane.addInput(this.state, 'frequency', { min: 1, max: 10 });
    pane.addInput(this.state, 'magnitude', { min: 0.01, max: 1 });
    pane.addInput(this.state, 'independence', { min: 0, max: 1 });
    pane.addInput(this.state, 'spacing', { min: 0, max: 1 });
    pane.addInput(this.state, 'count', { min: 1, max: 200 });
  };

  drawDeformedCircle = (ctx, circle, seed, color) => {
    ctx.beginPath();
    const samples = Math.floor(4 * circle.radius + 20);
    for (let j = 0; j < samples + 1; ++j) {
      const angle = (2 * Math.PI * j) / samples;

      // Figure out the x/y coordinates for the given angle
      const x = Math.cos(angle);
      const y = Math.sin(angle);

      // Randomly deform the radius of the circle at this point
      const deformation =
        this.state.simplex.noise3D(
          x * this.state.frequency,
          y * this.state.frequency,
          seed
        ) + 1;
      const radius = circle.radius * (1 + this.state.magnitude * deformation);

      // Extend the circle to this deformed radius
      ctx.lineTo(radius * x, radius * y);
    }

    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = this.hexToRGBA(color, 0.5);
    ctx.stroke();
  };

  hexToRGBA = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  draw = (ctx, w, h) => {
    console.log('RENDERNG', this.state);
    ctx.scale(2, 2);

    let radius = (1.1 * h) / 2;
    let circle = { x: w / 4, y: h / 4, radius };

    ctx.fillStyle = '#002F40';
    ctx.fillRect(0, 0, w, h);

    ctx.translate(w / 2, h / 2);
    let current = { ...circle };
    current.radius /= this.state.magnitude + 1;

    for (let i = 0; i < this.state.count; i++) {
      this.drawDeformedCircle(
        ctx,
        current,
        i * this.state.independence,
        this.state.colors[i % this.state.colors.length]
      );

      current.radius *= 1 - this.state.spacing;
    }
  };

  render = () => {
    return (
      <InteractiveLayout
        title="Sunset"
        description="Inspiration from Luke Patton's Canvas Cards."
        mountEditor={this.mountEditor}
      />
    );
  };
}

export default Sunset;
