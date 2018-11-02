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
    varying vec3 vPos;
    uniform float64 uTime;
    uniform float64 uAspc; 
    
    float64 D(vec2 p) {
       return sqrt(dot(sin(p), cos(p)));
    }
    
    void main() {
        float64 a = -2.24;
        float64 b = -0.65;
        float64 c = 0.43;
        float64 d = -2.43;
    
        vec3 mod = vPos * vPos;
        mod.x = mod.x / uAspc;
        mod[0] = .1 + cos(uTime) + 1. - sin(a * vPos[1]) - cos(b * vPos[0]);
        mod[1] = .15 + cos(uTime) * sin(c * vPos[0]) - cos(d * vPos[1]);
        mod[2] = .2 + cos(uTime) + 2. - sin(c * vPos[0]) - cos(d * vPos[1]);
        gl_FragColor = vec4(sqrt(mod), 1.);
    }
    `,
    vertex: GLSL`
attribute vec3 aPos;
varying   vec3 vPos;
void main() {
   gl_Position = vec4(aPos, 1.0);
   vPos = aPos;
}`,
  },
});

class Waves extends Component {
  render = () => {
    return (
      <ExperimentLayout
        title="Fermat's Spirals"
        color="#4499d6"
        mountDatGUI={this.mountDatGUI}
      >
        <Surface width={700} height={700}>
          <Node
            shader={shaders.helloRed}
            uniforms={{ red: Math.cos(1 / 100) }}
          />
        </Surface>
      </ExperimentLayout>
    );
  };
}

export default Waves;
