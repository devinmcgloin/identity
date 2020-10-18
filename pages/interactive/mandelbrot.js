import React, { Component } from 'react';
import InteractiveLayout from 'layouts/interactive';
import { Shaders, Node, GLSL } from 'gl-react';
import { Surface } from 'gl-react-dom';

const shaders = Shaders.create({
  mandelbrot: {
    vert: GLSL`
    attribute vec3 aPos;
    varying   vec3 vPos;
    void main() {
       gl_Position = vec4(aPos, 1.0);
       vPos = aPos;
    }`,
    frag: GLSL`
    precision highp float;
    varying vec3 vPos;       // Pixel position
    uniform float u_aspect;

    uniform int u_iterations;
    uniform float u_variation;
    uniform float u_threshold;
    uniform vec3 u_color;
    uniform bool u_smooth_coloring;

    vec3 simple_mandelbrot(vec2 p){
        vec3 c = vec3(0.0, 0.0, 0.0);
        float l = 1.0;
        vec2 z = vec2(0.0);
        for(int i = 0 ; i < 1000000; i++)
        {
            z = vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y ) + p;
            if( dot(z,z) > u_threshold)
            {
                c += 0.5 + 0.5 * cos(l * u_variation + u_color);
                break;
            }
            if( i > u_iterations)
            {
                break;
            }
            l += 1.0;
        }
        return c;
    }

    vec3 smooth_mandelbrot(vec2 p){
        vec3 c = vec3(0.0, 0.0, 0.0);
        float l = 1.0;
        vec2 z = vec2(0.0);
        for(int i = 0 ; i < 1000000; i++)
        {
            z = vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y ) + p;
            if( dot(z,z) > u_threshold)
            {
                float modulus = sqrt(dot(z, z));
                float mu = l - (log(log(modulus))) / log(2.0);
                c += 0.5 + 0.5 * cos(mu * u_variation + u_color);
                break;
            }
            if( i > u_iterations)
            {
                break;
            }
            l += 1.0;
        }
        return c;
    }
    void main() {
        vec3 nvPos = vPos;
        nvPos.x = vPos.x / u_aspect;
        nvPos.x -= 0.5;
        if(u_smooth_coloring){
            gl_FragColor = vec4( smooth_mandelbrot(nvPos.xy), 1.0 );
        } else {
            gl_FragColor = vec4( simple_mandelbrot(nvPos.xy), 1.0 );
        }
    }
    `,
  },
});

class Mandelbrot extends Component {
  constructor(props) {
    super(props);
    this.iterations = 100;
    this.color = [93, 117, 179];
    this.variation = 0.2;
    this.threshold = 100.0;
    this.smooth_coloring = true;
  }

  mountEditor = (pane) => {
    pane.addInput(this, 'iterations');
  };

  render = () => {
    return (
      <InteractiveLayout title="Mandelbrot" mountEditor={this.mountEditor}>
        <Surface
          width={900}
          height={900}
          webglContextAttributes={{ alpha: false }}
        >
          <Node
            shader={shaders.mandelbrot}
            uniforms={{
              u_aspect: 1,
              u_iterations: this.iterations,
              u_variation: this.variation,
              u_color: this.color,
              u_threshold: this.threshold,
              u_smooth_coloring: this.smooth_coloring,
            }}
          />
        </Surface>
      </InteractiveLayout>
    );
  };
}

export default Mandelbrot;
