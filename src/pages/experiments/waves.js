import React, { Component } from 'react';
import { Shaders, Node, GLSL as glsl } from 'gl-react';
import { Surface } from 'gl-react-dom';
import { ExperimentLayout } from '../../components/layout';

const shaders = Shaders.create({
  waves: {
    frag: glsl`
    precision highp float;

    varying vec2 uv;
    uniform float uTime;
    
    void main() {
        float a = -2.24;
        float b = -0.65;
        float c = 0.43;
        float d = -2.43;
    
        vec3 clr = vec3(0.0, 0.0, 0.0);
        clr[0] = .1 + cos(uTime) + 1. - sin(a * uv[1]) - cos(b * uv[0]);
        clr[1] = .15 + cos(uTime) * sin(c * uv[0]) - cos(d * uv[1]);
        clr[2] = .2 + cos(uTime) + 2. - sin(c * uv[0]) - cos(d * uv[1]);
        gl_FragColor = vec4(sqrt(clr), 1.);
    }
    `,
    vert: glsl`
    attribute vec2 _p;
    varying vec2 uv;
    void main() {
        gl_Position = vec4(_p,0.0,1.0);
        uv = _p;
    }`,
  },
});

const Renderable = ({ shader, time, width, height }) => (
  <Surface width={width} height={height}>
    <Node
      shader={shader}
      sync={true}
      uniforms={{
        uTime: time,
      }}
    />
  </Surface>
);

class Waves extends Component {
  state = { startTime: Date.now(), elapsedTime: 0 };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      setInterval(
        () =>
          this.setState({
            elapsedTime: (Date.now() - this.state.startTime) / 1000,
          }),
        30
      );
    }
  }

  render = () => {
    return (
      <ExperimentLayout title="Waves" color="#ededed">
        <Renderable shader={shaders.waves} time={this.state.elapsedTime} />
      </ExperimentLayout>
    );
  };
}

export default Waves;
