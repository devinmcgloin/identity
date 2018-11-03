import React, { Component } from 'react';
import { Shaders, Node, GLSL } from 'gl-react';
import { Surface } from 'gl-react-dom';
import { ExperimentLayout } from '../../components/layout';

const shaders = Shaders.create({
  helloRed: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform float red;
    void main() {
      gl_FragColor = vec4(red, uv.x, uv.y, 1.0);
    }
    `,
  },
  waves: {
    frag: GLSL`
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
  },
});

class Waves extends Component {
  constructor(props) {
    super(props);
    this.startTime = Date.now();
  }

  timeElapsed = () => Date.now() - this.startTime;
  time = () => this.timeElapsed() / 1000;

  render = () => {
    return (
      <ExperimentLayout title="Waves" color="#4499d6">
        <Surface width={800} height={400}>
          <Node
            shader={shaders.waves}
            uniforms={{
              uTime: this.time(),
            }}
          />
        </Surface>
      </ExperimentLayout>
    );
  };
}

export default Waves;
