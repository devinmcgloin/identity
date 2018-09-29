---
layout: webgl
title: Shifting Spheres
featuredImage: "./feature.jpeg"
webgl: true
datgui: true
date: 2017-02-08
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
   vec3 nvPos = vPos;
   nvPos.x = vPos.x / uAspc;

   vec3 V = vec3(0.,0.,0.);                      // Ray origin
   vec3 W = normalize(vec3(nvPos.xy, -3.));      // Ray direction

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

</script>

<script>
window.onload = function(){
    var text = {
        BackgroundColor: [4, 4, 5],
        SphereColor: [200, 200, 225],
        FirstLightColor: [100, 100, 100],
        SecondLightColor: [100, 100, 100],
        Mem : {},
        Update: function(gl){
            gl.uniform3fv(this.Mem.BackgroundColor, this.BackgroundColor);
            gl.uniform3fv(this.Mem.SphereColor, this.SphereColor);
            gl.uniform3fv(this.Mem.FirstLightColor, this.FirstLightColor);
            gl.uniform3fv(this.Mem.SecondLightColor, this.SecondLightColor);
        },
        Init : function(gl, program){
            this.Mem.BackgroundColor = gl.getUniformLocation(program,
            'uBackgroundColor');
            this.Mem.SphereColor = gl.getUniformLocation(program,
            'uSphereColor');
            this.Mem.FirstLightColor = gl.getUniformLocation(program,
            'uFirstLightColor');
            this.Mem.SecondLightColor = gl.getUniformLocation(program,
            'uSecondLightColor');
        },
    }
    console.log(text);
    var gui = new dat.GUI();
    gui.addColor(text, 'BackgroundColor');
    gui.addColor(text, 'SphereColor');
    gui.addColor(text, 'FirstLightColor');
    gui.addColor(text, 'SecondLightColor');

    //gui.closed = true;
    var vs = vs_script.innerHTML, fs = fs_script.innerHTML;

    addTextEditor(fs, function() { canvas.setShaders(vs, this.value); });

    gl_start(canvas, vs, fs, text);
};
</script>
