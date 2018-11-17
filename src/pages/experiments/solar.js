import React, { Component } from 'react';
import { ExperimentLayout } from '../../components/layout';
import { setupCanvas } from '../../components/experiment';
import { p2c } from '../../lib/math';
import Matrix from '../../lib/matrix';

class Solar extends Component {
  state = {
    M: new Matrix(),
    planets: [
      {
        color: '#F2BB05',
        size: 48,
        sides: 9,
        distance: 0,
        theta: 3,
        orbital_speed: 0,
        rotation_speed: 0.2,
      },
      {
        color: '#FFA400',
        size: 7,
        sides: 3,
        distance: 75,
        theta: Math.random() * Math.PI,
        orbital_speed: 0.8,
        rotation_speed: 1,
      },
      {
        color: '#840032',
        size: 12,
        sides: 4,
        distance: 122,
        theta: Math.random() * Math.PI,
        orbital_speed: 0.2,
        rotation_speed: 0.8,
      },
      {
        color: '#009FFD',
        size: 24,
        sides: 7,
        distance: 200,
        theta: Math.random() * Math.PI,
        orbital_speed: 0.07,
        rotation_speed: 0.92,
      },
      {
        color: '#052F5F',
        size: 24,
        sides: 5,
        distance: 500,
        theta: Math.random() * Math.PI,
        orbital_speed: 0.07,
        rotation_speed: 0.92,
      },
    ],
    rotation_speed: 0.2,
    background: '#000000',
    startTime: Date.now(),
    elapsedTime: 0,
  };

  //   mountDatGUI = datgui => {
  //     datgui.add(this.state, 'size', 1, 10);
  //     datgui.add(this.state, 'scaling_factor', 0.001, 0.02);
  //     datgui.add(this.state, 'angle', 0, 180);
  //     datgui.add(this.state, 'count', 1, 20000);
  //     datgui.addColor(this.state, 'color');
  //   };

  componentDidMount = () => {
    if (typeof window !== 'undefined') {
      setInterval(
        () =>
          this.setState({
            elapsedTime: (Date.now() - this.state.startTime) / 1000,
          }),
        30
      );
    }
    setupCanvas(canvas, this.draw);
  };

  draw = (ctx, w, h) => {
    let { M, planets, elapsedTime, rotation_speed } = this.state;
    let m = M.identityMatrix();

    planets.map(p => {
      M.save(m);
      M.translate(m, [w / 2, h / 2, 0]);
      M.rotateZ(m, rotation_speed + p.orbital_speed * elapsedTime);

      const [x, y] = p2c(p.distance, p.theta);
      ctx.beginPath();
      const [true_x, true_y] = M.transform(m, [x, y, 0]);
      this.drawPlanet(
        ctx,
        true_x,
        true_y,
        p.size,
        p.rotation_speed * elapsedTime,
        p.sides,
        p.color
      );
      ctx.fill();
      M.restore(m);
    });
  };

  drawPlanet = (ctx, x, y, size, rotation, sides, color) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = '#4e4e4e';
    ctx.lineWidth = 5;
    const sampleRate = 1 / sides;
    for (let i = 0; i <= (sides + 1) * sampleRate; i += sampleRate) {
      let [x_diff, y_diff] = p2c(size, rotation + i * Math.PI * 2);
      ctx.lineTo(x + x_diff, y + y_diff);
    }
    ctx.stroke();
    ctx.fill();
  };
  render = () => {
    return (
      <ExperimentLayout
        title="Solar"
        color="#4e4e4e"
        // mountDatGUI={this.mountDatGUI}
      />
    );
  };
}

export default Solar;
