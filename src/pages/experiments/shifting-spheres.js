import React, { Component } from 'react';
import { Shaders, Node, GLSL as glsl } from 'gl-react';
import { Surface } from 'gl-react-dom';
import { ExperimentLayout } from '../../components/layout';

const shaders = Shaders.create({
  spheres: {
    frag: glsl`
    precision highp float;

    varying vec2 uv;                               // Pixel position
    uniform float uTime;                             // Time
    uniform float uAspc;
    uniform vec3 uBackgroundColor;
    uniform vec3 uSphereColor;
    uniform vec3 uFirstLightColor;
    uniform vec3 uSecondLightColor;
    
    vec3 L1Dir = normalize(vec3(-1.,1.,sin(uTime)));
    vec3 L2Dir = normalize(vec3(1.,.5,cos(uTime)));

    vec2 raytraceSphere(vec3 V, vec3 W, vec4 S) {
       V -= S.xyz;
       float B = 2. * dot(V, W);
       float C = dot(V, V) - S.w * S.w;
       float discrim = B*B - 4.*C;
       return discrim < 0. ? vec2(-1., -1)
                           : vec2(-B - discrim, -B + discrim) / 2.;
    }
    
    vec3 normalizeColor(vec3 c){
        return c / 255.;
    }
    
    void main() {
      vec3 c = normalizeColor(uBackgroundColor);
      vec2 nuv = uv;
      nuv.x = nuv.x / uAspc;
    
      vec3 V = vec3(0.,0.,0.);                      // Ray origin
      vec3 W = normalize(vec3(nuv.xy, -3.));      // Ray direction
    
      vec4 S1 = vec4(.35 - sin(uTime) * .8,  0, -5. + cos(uTime)* .8, .45);
      vec4 S2 = vec4(-.35 + sin(uTime) * .8, 0, -5. + sin(uTime)* .8, .45);
    
      vec2 t1 = raytraceSphere(V, W, S1);             // Ray trace sphere
      vec2 t2 = raytraceSphere(V, W, S2);
    
      if (t1.x > 0. && (t1.x < t2.x || t2.x < 0.)) {
        vec3 P = V + t1.x * W;                      // Point on sphere
        vec3 N = normalize(P - S1.xyz);             // Surface normal
        float brightness = max(0., dot(N, L1Dir));
        brightness = mix(.1, brightness, .5);      // Diffuse surface
        c = normalizeColor(uSphereColor) * brightness * normalizeColor(uFirstLightColor);
       }
    
      if (t2.x > 0. && (t2.x < t1.x || t1.x < 0.)) {
        vec3 P = V + t2.x * W;                      // Point on sphere
        vec3 N = normalize(P - S2.xyz);             // Surface normal
        float brightness = max(0., dot(N, L2Dir));
        brightness = mix(.1, brightness, .5);      // Diffuse surface
        c = normalizeColor(uSphereColor) * brightness * normalizeColor(uSecondLightColor);
      }
    
       gl_FragColor = vec4(sqrt(c), 1.);             // Final pixel color
    }
    `,
    vert: glsl`
    precision highp float;

    attribute vec2 _p;
    varying vec2 uv;
    void main() {
        gl_Position = vec4(_p,0.0,1.0);
        uv = _p;
    }`,
  },
});

const Renderable = ({ shader, uniforms, width, height }) => {
  uniforms.uAspc = height / width;
  return (
    <Surface width={width} height={height}>
      <Node shader={shader} sync={true} uniforms={uniforms} />
    </Surface>
  );
};

class ShiftingSpheres extends Component {
  state = {
    uBackgroundColor: [4, 4, 5],
    uSphereColor: [200, 200, 225],
    uFirstLightColor: [100, 100, 100],
    uSecondLightColor: [100, 100, 100],
    startTime: Date.now(),
    uTime: 0,
  };

  componentDidMount() {
    setInterval(
      () =>
        this.setState({
          uTime: (Date.now() - this.state.startTime) / 1000,
        }),
      30
    );
  }

  listen = (dat, key) => {
    dat.addColor(this.state, key).onChange(v => {
      console.log(`setting: ${key}: ${v}`);
      this.setState({ [key]: v });
    });
  };

  mountDatGUI = datgui => {
    this.listen(datgui, 'uBackgroundColor');
    this.listen(datgui, 'uSphereColor');
    this.listen(datgui, 'uFirstLightColor');
    this.listen(datgui, 'uSecondLightColor');
  };

  render = () => {
    const { startTime, ...shaderUniforms } = this.state;

    return (
      <ExperimentLayout
        title="Shifting Spheres"
        color="#ffffff"
        mountDatGUI={this.mountDatGUI}
      >
        <Renderable shader={shaders.spheres} uniforms={shaderUniforms} />
      </ExperimentLayout>
    );
  };
}

export default ShiftingSpheres;
