import React, { Component } from 'react';
import InteractiveLayout from 'layouts/interactive';
import { setupCanvas } from 'lib/interactive/canvas';
import Swarm from 'lib/interactive/swarm';

class Boids extends Component {
  constructor(props) {
    super(props);
    this.boids = new Swarm();
  }

  mountEditor = (pane) => {
    pane.addInput(this.boids, 'background');
    pane.addInput(this.boids, 'numBoids', { min: 10, max: 1000, step: 1 });

    var yellow = pane.addFolder({ title: 'Yellow Swarm', expanded: false }),
      salmon = pane.addFolder({ title: 'Salmon Swarm', expanded: false }),
      pred = pane.addFolder({ title: 'Predator', expanded: false });

    yellow.addInput(this.boids.config.yellow, 'fillStyle'),
      yellow.addInput(this.boids.config.yellow, 'radius', { min: 1, max: 15 }),
      yellow.addInput(this.boids.config.yellow, 'radialSpeed', {
        min: 0.00005,
        max: 0.3,
      }),
      yellow.addInput(this.boids.config.yellow, 'speed', { min: 1, max: 10 }),
      yellow.addInput(this.boids.config.yellow, 'vision', {
        min: 10,
        max: 200,
      }),
      salmon.addInput(this.boids.config.salmon, 'fillStyle'),
      salmon.addInput(this.boids.config.salmon, 'radius', { min: 1, max: 15 }),
      salmon.addInput(this.boids.config.salmon, 'radialSpeed', {
        min: 0.00005,
        max: 0.3,
      }),
      salmon.addInput(this.boids.config.salmon, 'speed', { min: 1, max: 10 }),
      salmon.addInput(this.boids.config.salmon, 'vision', {
        min: 10,
        max: 200,
      }),
      pred.addInput(this.boids, 'activePred'),
      pred.addInput(this.boids.config.pred, 'fillStyle'),
      pred.addInput(this.boids.config.pred, 'radius', { min: 1, max: 15 }),
      pred.addInput(this.boids.config.pred, 'radialSpeed', {
        min: 0.00005,
        max: 0.3,
      }),
      pred.addInput(this.boids.config.pred, 'speed', { min: 1, max: 10 }),
      pred.addInput(this.boids.config.pred, 'vision', { min: 10, max: 200 }),
      pane.on('change', () => {
        this.boids.update();
        this.boids.updatePred();
      });
  };

  componentDidMount = () => {
    let canvas = document.getElementById('canvas');
    setupCanvas(canvas, this.draw, () => {}, false, 50);
    this.boids.setContext(canvas.getContext('2d'));
    this.boids.animate();
    this.boids.clear();
    this.boids.createBoids(600);
  };

  draw = () => {
    this.boids.animate();
  };

  render = () => {
    return (
      <InteractiveLayout
        title="Boids"
        description="These boids are based on common flocking patterns, and attempt to create a digital Koi Pond from above."
        color="#4499d6"
        mountEditor={this.mountEditor}
      />
    );
  };
}

export default Boids;
