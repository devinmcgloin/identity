---
layout: webgl
title: Waves
image: "waves.jpeg"
webgl: true
date: 2017-01-27
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
varying vec3 vPos;       // Pixel position
uniform float uTime;     // Time
uniform float uAspc;

float D(vec2 p) {
   return sqrt(dot(sin(p), cos(p)));
}

void main() {

   float a = -2.24;
   float b = -0.65;
   float c = 0.43;
   float d = -2.43;

   vec3 mod = vPos * vPos;
   mod.x = mod.x / uAspc;
   mod[0] = .1 + cos(uTime) + 1. - sin(a * vPos[1]) - cos(b * vPos[0]);
   mod[1] = .15 + cos(uTime) * sin(c * vPos[0]) - cos(d * vPos[1]);
   mod[2] = .2 + cos(uTime) + 2. - sin(c * vPos[0]) - cos(d * vPos[1]);

   // Final pixel color
   gl_FragColor = vec4(sqrt(mod), 1.);
}

</script>

<script>
window.onload = function(){
    var vs = vs_script.innerHTML, fs = fs_script.innerHTML;

    gl_start(canvas, vs, fs, undefined);
};
</script>
