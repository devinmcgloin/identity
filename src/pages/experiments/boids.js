import React, { Component } from 'react';
import { ExperimentLayout } from '../../components/layout';
import { setupCanvas } from '../../components/experiment';
import Swarm from '../../lib/swarm';
import '../../style/datgui.css';

class Boids extends Component {
  constructor(props) {
    super(props);
    this.boids = new Swarm();
  }

  mountDatGUI = datgui => {
    debugger;
    datgui.addColor(this.boids, 'background');
    datgui.add(this.boids, 'numBoids', 10, 1000).step(1);

    var yellow = datgui.addFolder('Yellow Swarm'),
      salmon = datgui.addFolder('Salmon Swarm'),
      pred = datgui.addFolder('Predator');

    var controllers = [];
    controllers.push(yellow.addColor(this.boids.config.yellow, 'fillStyle'));
    controllers.push(yellow.add(this.boids.config.yellow, 'radius', 1, 15));
    controllers.push(
      yellow.add(this.boids.config.yellow, 'radialSpeed', 0.00005, 0.3)
    );
    controllers.push(yellow.add(this.boids.config.yellow, 'speed', 1, 10));
    controllers.push(yellow.add(this.boids.config.yellow, 'vision', 10, 200));
    controllers.push(salmon.addColor(this.boids.config.salmon, 'fillStyle'));
    controllers.push(salmon.add(this.boids.config.salmon, 'radius', 1, 15));
    controllers.push(
      salmon.add(this.boids.config.salmon, 'radialSpeed', 0.00005, 0.3)
    );
    controllers.push(salmon.add(this.boids.config.salmon, 'speed', 1, 10));
    controllers.push(salmon.add(this.boids.config.salmon, 'vision', 10, 200));
    for (var i = 0; i < controllers.length; i++)
      controllers[i].onChange(() => {
        this.boids.update();
      });

    controllers = [];
    pred.add(this.boids, 'activePred');
    controllers.push(pred.add(this.boids.config.pred, 'radius', 1, 15));
    controllers.push(
      pred.add(this.boids.config.pred, 'radialSpeed', 0.00005, 0.3)
    );
    controllers.push(pred.add(this.boids.config.pred, 'speed', 1, 10));
    controllers.push(pred.add(this.boids.config.pred, 'vision', 10, 200));
    controllers.push(pred.addColor(this.boids.config.pred, 'fillStyle'));
    for (var i = 0; i < controllers.length; i++)
      controllers[i].onChange(() => {
        this.boids.updatePred();
      });
  };

  componentDidMount = () => {
    let canvas = document.getElementById('canvas');
    setupCanvas(canvas, this.draw, () => {}, false);
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
      <ExperimentLayout
        title="Boids"
        color="#4499d6"
        mountDatGUI={this.mountDatGUI}
      />
    );
  };
}

export default Boids;
