import React, { Component } from 'react';
import { Shaders, Node, GLSL as glsl } from 'gl-react';
import { Surface } from 'gl-react-dom';
import { ExperimentLayout } from '../../components/layout';

const shaders = Shaders.create({
  spheres: {
    frag: glsl`
    precision highp float;

    varying vec2 uv;
    uniform float uTime;
    uniform float uAspc;


    uniform vec3 uBackgroundColor[2];
    #define uBackgroundColorLength 2;

    uniform vec4 uSphereLoc[2];
    uniform vec4 uSphereColor[2];

    uniform vec3 uLightColor[2];
    uniform vec3 uLightDir[2];

    vec2 raytraceSphere(vec3 V, vec3 W, vec4 S)
    {
        V -= S.xyz;
        float B = 2. * dot(V, W);
        float C = dot(V, V) - S.w * S.w;
        float discrim = B * B - 4.*C;
        vec2 t = vec2(1000., 1000.);

        if(discrim > 0.)
            t = vec2(-B - discrim, -B + discrim) / 2.;

        return t.x > 0. ? t : vec2(1000., 1000.);
    }

    vec3 backgroundColor(vec3 dir)
    {
        float t = .5 - .5 * dir.y;
        return mix(uBackgroundColor[0], uBackgroundColor[1], 1. - t * t);
    }

    vec4 C;
    vec3 V, W, P, E, N;

    vec3 phong(vec3 N, vec3 E, vec3 A, vec3 D, vec4 S)
    {
        vec3 c = A * backgroundColor(N);            // Ambient color

        for(int i = 0 ; i < 2; i++) {  // Loop through lights
            vec3  LDir = normalize(uLightDir[i]);

            bool isLit = true;
            for (int j = 0; j < 2; j++){
                if (raytraceSphere(P+.001 , LDir, uSphereLoc[j]).x < 1000.)
                    isLit = false;
            }

            if(isLit){
                float d = max(0., dot(N, LDir));           // Diffuse value
                vec3  R = reflect(-LDir, N);
                float s = pow(max(0., dot(E, R)), S.a);    // Specular value
                c += uLightColor[i] * (d * D + s * S.rgb * .1 * S.a);
            }
        }

        return c;
    }


    bool raytrace()
    {
        float distance = 1000.;

        for(int i = 0 ; i < 2; i++) {
            vec2 t = raytraceSphere(V, W, uSphereLoc[i]);

            if(t.x < distance) {
                C = uSphereColor[i];
                P = V + t.x * W;                      // Point on sphere
                E = -normalize(P);                    // Direction to eye
                N = normalize(P - uSphereLoc[i].xyz);   // Surface normal
                distance = t.x;
            }
        }

        return distance < 1000.;
    }

    void main()
    {
        vec3 nvPos = vec3(uv, 0.0);
        nvPos.x = nvPos.x / uAspc;
        vec3 c = vec3(0., 0., 0.);
        V = vec3(0., 0., 0.);                       // Ray origin
        W = normalize(vec3(nvPos.xy, -3.));          // Ray direction

        if(! raytrace())
            c = backgroundColor(nvPos);
        else
            for(int bounce = 0 ; bounce < 5 ; bounce++) {
                c += phong(N, E, .1 * C.rgb, .5 * C.rgb, C);
                V = P + .001 * W;
                W = reflect(W, N);

                if(! raytrace()) {
                    c += .05 * backgroundColor(W);
                    break;
                }
            }

        gl_FragColor = vec4(sqrt(c), 1.);           // Final pixel color
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
    uBackgroundColor: [150, 100, 65, 150, 175, 225],
    uLightColor: [0.5, 0.5, 1, 0.2, 0.2, 0.1],
    uLightDir: [1, 1, 1, -1, -1, -1],
    uSphereColor: [0, 0, 0, 0, 0, 0, 0, 0],
    uSphereLoc: [-0.5, 0, -3, 0.5, 0.5, 0.0, -3, 0.5],
    TopRight: [127, 127, 255],
    BottomLeft: [51, 51, 25],

    // Spheres
    FirstColor: [100, 200, 255],
    FirstSpectral: 7,
    SecondColor: [200, 100, 100],
    SecondSpectral: 1,

    // Background
    TopColor: [150, 175, 225],
    BottomColor: [150, 100, 65],

    startTime: Date.now(),
    uTime: 0,
  };

  update = () => {
    const timeElapsed = (Date.now() - this.StartTime) / 1000,
      s = 0.5 * Math.sin(timeElapsed),
      c = 0.5 * Math.cos(timeElapsed),
      t = 0.1 * Math.tan(timeElapsed);

    let newSphereLocations = [...this.state.uSphereLoc];
    newSphereLocations[4] = -s + t;
    newSphereLocations[5] = c + t;
    newSphereLocations[0] = s - t;
    newSphereLocations[1] = -c - t;

    let uSphereColor = [
      this.state.FirstColor.map(x => x / 255.0),
      this.state.FirstSpectral,
      this.state.SecondColor.map(x => x / 255.0),
      this.state.SecondSpectral,
    ].reduce((acc, cur) => acc.concat(cur), []);

    let uBackgroundColor = [
      this.state.BottomColor.map(x => x / 255),
      this.state.TopColor.map(x => x / 255),
    ].reduce((acc, cur) => acc.concat(cur), []);

    let uLightColor = [
      this.state.TopRight.map(x => x / 255.0),
      this.state.BottomLeft.map(x => x / 255.0),
    ].reduce((acc, cur) => acc.concat(cur), []);

    this.setState({
      uTime: timeElapsed,
      uSphereLoc: newSphereLocations,
      uSphereColor,
      uBackgroundColor,
      uLightColor,
    });
  };

  componentDidMount() {
    this.update();
    if (typeof window !== 'undefined') {
      setInterval(this.update, 30);
    }
  }

  listen = (f, key) => {
    f(this.state, key).onChange(v => {
      this.setState({ [key]: v });
    });
  };

  mountDatGUI = datgui => {
    // this.listen(datgui.addColor, 'uBackgroundColor');
    // this.listen(datgui.addColor, 'uSphereColor');
    // this.listen(datgui.addColor, 'uFirstLightColor');
    // this.listen(datgui.addColor, 'uSecondLightColor');
  };

  render = () => {
    const { startTime, ...shaderUniforms } = this.state;

    return (
      <ExperimentLayout
        title="Reflect"
        color="#ffffff"
        mountDatGUI={this.mountDatGUI}
      >
        <Renderable shader={shaders.spheres} uniforms={shaderUniforms} />
      </ExperimentLayout>
    );
  };
}

export default ShiftingSpheres;
