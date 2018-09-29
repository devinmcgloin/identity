---
layout: webgl
title: Reflect
image: "reflect.jpeg"
webgl: true
datgui: true
date: 2017-02-18
excerpt: Made with WebGL
---

<script id='vs_script' type='x-shader/x-vertex'>
   attribute vec3 aPos;
   varying   vec3 vPos;
   void main() {
      gl_Position = vec4(aPos, 1.0);  // Set position of vertex in image.
      vPos = aPos;                    // Copy pos to a varying variable to
   }                                  //   interpolate it across pixels.
</script>

<script id='fs_script' type='x-shader/x-fragment'>
varying vec3 vPos;                               // Pixel position
uniform float uTime;                             // Time
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
    vec3 nvPos = vPos;
    nvPos.x = vPos.x / uAspc;
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
}
</script>

<script>
window.onload = function(){
    var text = {
       BackgroundColor: [150, 100, 65, 150, 175, 225],
       LightColor: [.5, .5, 1,  .2, .2, .1],
       LightDir: [1, 1, 1, -1,-1,-1],
       SphereColor: [],
       SphereLoc: [-.5,0,-3,.5  , .5,.0,-3,.5],
       StartTime: Date.now(),
       Mem : {},

       // Lights
       TopRight : [127, 127, 255],
       BottomLeft : [51, 51, 25],
        // Spheres
       FirstColor : [100, 200, 255],
       FirstSpectral : 7,
       SecondColor : [200, 100, 100],
       SecondSpectral : 1,
        // Background
       TopColor : [150, 175, 225],
       BottomColor : [150, 100, 65],
       Init : function(gl, program) {
            this.Mem.BackgroundColor = gl.getUniformLocation(program,
            'uBackgroundColor');
            this.Mem.LightColor = gl.getUniformLocation(program, 'uLightColor');
            this.Mem.LightDir = gl.getUniformLocation(program, 'uLightDir');
            this.Mem.SphereColor = gl.getUniformLocation(program,
            'uSphereColor');
            this.Mem.SphereLoc = gl.getUniformLocation(program, 'uSphereLoc');
       },

       Update : function (gl) {
            var s = 0.5 * Math.sin((Date.now() - this.StartTime) / 1000);
            var c = 0.5 * Math.cos((Date.now() - this.StartTime) / 1000);
            var t = 0.1 * Math.tan((Date.now() - this.StartTime) / 1000);

            this.SphereLoc[4] = -s + t;
            this.SphereLoc[5] = c + t;
            this.SphereLoc[0] = s - t;
            this.SphereLoc[1] = -c - t;

            this.SphereColor = [this.FirstColor.map((x) => x / 255.0),
            this.FirstSpectral, this.SecondColor.map((x) => x / 255.0),
            this.SecondSpectral].reduce( ( acc, cur ) => acc.concat(cur), [] );

            this.BackgroundColor = [this.BottomColor.map((x) => x /
            255.), this.TopColor.map((x) => x / 255.) ].reduce ((acc,
            cur) => acc.concat(cur), [] );

            this.LightColor = [this.TopRight.map((x) => x / 255.0), this.BottomLeft.map((x) => x / 255.0)].reduce( ( acc, cur ) => acc.concat(cur), [] );

            gl.uniform4fv(this.Mem.SphereLoc, this.SphereLoc);
            gl.uniform4fv(this.Mem.SphereColor, this.SphereColor);
            gl.uniform3fv(this.Mem.LightColor, this.LightColor);
            gl.uniform3fv(this.Mem.LightDir, this.LightDir);
            gl.uniform3fv(this.Mem.BackgroundColor, this.BackgroundColor);
        }
    }
    var gui = new dat.GUI();
    var s = gui.addFolder('Spheres');
    s.addColor(text, 'FirstColor');
    s.add(text, 'FirstSpectral', 1, 15);

    s.addColor(text, 'SecondColor');
    s.add(text, 'SecondSpectral', 1, 15);
    var bg = gui.addFolder('Background');
    bg.addColor(text, 'TopColor');
    bg.addColor(text, 'BottomColor');
    var bg = gui.addFolder('Lights');
    bg.addColor(text, 'TopRight');
    bg.addColor(text, 'BottomLeft');

    var vs = vs_script.innerHTML, fs = fs_script.innerHTML;

    addTextEditor(fs, function() { canvas.setShaders(vs, this.value); });

    gl_start(canvas, vs, fs, text);
};
</script>
