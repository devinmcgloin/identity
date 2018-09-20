---
layout: webgl
title: Orbiting Ring
image: /public/experiments/orbiting-ring.jpeg
date: 2017-04-20
excerpt: Made with Parametric Surfaces and WebGL
---
<style>
.webgl-container {
    background: #e0e0c5;
}
</style>


<script id='vs_script' type='x-shader/x-vertex'>
   attribute vec3 aPos, aNor;
   varying   vec3 vPos, vNor;
   uniform   mat4 matrix, invMatrix;
   uniform   float uAspc;
   void main() {
      vec4 pos = matrix * vec4(aPos, 1.);
      pos.x = pos.x * uAspc;
      vec4 nor = vec4(aNor, 0.) * invMatrix;

// dot(nor, pos);
// dot(nor * invMatrix, matrix * pos);
// nor . invMatrix . matrix . pos
// nor . (invMatrix . matrix) . pos
// nor . pos

      gl_Position = pos;
      vPos = pos.xyz;
      vNor = nor.xyz;

   }
</script>

<script id='fs_script' type='x-shader/x-fragment'>
varying vec3 vPos, vNor;

vec3 LDir = normalize(vec3(-1, 1, -0.5));
vec3 LColor = vec3(.3, .8, .5);
vec3 ObjectColor = vec3(.2, .4, .9);

void main() {
   vec3 normal = normalize(vNor);
   float brightness = max(0., dot(normal, LDir));
   brightness = mix(.1, brightness, .6);
   vec3 c = ObjectColor * brightness * LColor;
   gl_FragColor = vec4(sqrt(c), 1.);
}
</script>

<script>
{% include matrix.js %}
{% include shapes.js %}
{% include webgl-v2.js %}

var m = M.identityMatrix();

var vs = vs_script.innerHTML,
    fs = fs_script.innerHTML;

var obj1, obj2;

gl_start(canvas, vs, fs,
    function(time) {
        M.identity(m);
        M.rotateY(m, time);
        M.scale(m, .5);

        M.save(m);
            M.scale(m, .3);
            M.rotateX(m, .6 * time);
            obj1.setMatrix(m);
        M.restore(m);

        M.save(m);
            M.rotateX(m, .3 * time);
            obj2.setMatrix(m);
        M.restore(m);
    }
);
var scene = new Scene();

obj1 = new SceneObject();
obj1.setVertices(S.parametricTriMesh(S.sphere(), 5, 120));
scene.addObject(obj1);

obj2 = new SceneObject();
obj2.setVertices(S.parametricTriMesh(S.torus, 120, 100));
scene.addObject(obj2);

canvas.scene = scene;
</script>
