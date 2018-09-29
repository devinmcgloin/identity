---
layout: webgl
title: Green and Orange
image: "green-orange.jpeg"
webgl: true
date: 2017-03-01
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
varying vec3 vPos;
uniform float uTime;
uniform float uAspc;

struct Light {
    vec3 direction;
    vec3 color;
};

struct Material {
    vec3  ambient;
    vec3  diffuse;
    vec3  specular;
    float power;
    float refraction;
};

struct Sphere {
    vec3     center;
    float    radius;
    Material material;
};

struct Ray {
   vec3 origin;
   vec3 direction;
   vec3 intersection;
   vec3 surfaceNormal;
   vec3 viewAngle;
   Material objectMaterial;
};

uniform vec3 uBackground[2];
uniform Light uLights[2];
#define NLIGHTS 2
uniform Sphere uSpheres[1];
#define NSPHERES 1

  vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
   vec4 mod289(vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }
   vec4 permute(vec4 x) { return mod289(((x*34.)+1.)*x); }
   vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - .85373472095314 * r; }
   vec3 fade(vec3 t) { return t*t*t*(t*(t*6.-15.)+10.); }
   float noise(vec3 P) {
      vec3 i0 = mod289(floor(P)), i1 = mod289(i0 + vec3(1.)),
           f0 = fract(P), f1 = f0 - vec3(1.), f = fade(f0);
      vec4 ix = vec4(i0.x, i1.x, i0.x, i1.x), iy = vec4(i0.yy, i1.yy),
           iz0 = i0.zzzz, iz1 = i1.zzzz,
           ixy = permute(permute(ix) + iy), ixy0 = permute(ixy + iz0), ixy1 = permute(ixy + iz1),
           gx0 = ixy0 * (1. / 7.), gy0 = fract(floor(gx0) * (1. / 7.)) - .5,
           gx1 = ixy1 * (1. / 7.), gy1 = fract(floor(gx1) * (1. / 7.)) - .5;
      gx0 = fract(gx0); gx1 = fract(gx1);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0), sz0 = step(gz0, vec4(0.)),
           gz1 = vec4(0.5) - abs(gx1) - abs(gy1), sz1 = step(gz1, vec4(0.));
      gx0 -= sz0 * (step(0., gx0) - .5); gy0 -= sz0 * (step(0., gy0) - .5);
      gx1 -= sz1 * (step(0., gx1) - .5); gy1 -= sz1 * (step(0., gy1) - .5);
      vec3 g0 = vec3(gx0.x,gy0.x,gz0.x), g1 = vec3(gx0.y,gy0.y,gz0.y),
           g2 = vec3(gx0.z,gy0.z,gz0.z), g3 = vec3(gx0.w,gy0.w,gz0.w),
           g4 = vec3(gx1.x,gy1.x,gz1.x), g5 = vec3(gx1.y,gy1.y,gz1.y),
           g6 = vec3(gx1.z,gy1.z,gz1.z), g7 = vec3(gx1.w,gy1.w,gz1.w);
      vec4 norm0 = taylorInvSqrt(vec4(dot(g0,g0), dot(g2,g2), dot(g1,g1), dot(g3,g3))),
           norm1 = taylorInvSqrt(vec4(dot(g4,g4), dot(g6,g6), dot(g5,g5), dot(g7,g7)));
      g0 *= norm0.x; g2 *= norm0.y; g1 *= norm0.z; g3 *= norm0.w;
      g4 *= norm1.x; g6 *= norm1.y; g5 *= norm1.z; g7 *= norm1.w;
      vec4 nz = mix(vec4(dot(g0, vec3(f0.x, f0.y, f0.z)), dot(g1, vec3(f1.x, f0.y, f0.z)),
                         dot(g2, vec3(f0.x, f1.y, f0.z)), dot(g3, vec3(f1.x, f1.y, f0.z))),
                    vec4(dot(g4, vec3(f0.x, f0.y, f1.z)), dot(g5, vec3(f1.x, f0.y, f1.z)),
                         dot(g6, vec3(f0.x, f1.y, f1.z)), dot(g7, vec3(f1.x, f1.y, f1.z))), f.z);
      return 2.2 * mix(mix(nz.x,nz.z,f.y), mix(nz.y,nz.w,f.y), f.x);
   }
   float turbulence(vec3 P) {
      float f = 0., s = 1.;
      for (int i = 0 ; i < 9 ; i++) {
         f += abs(noise(s * P)) / s;
         s *= 2.;
         P = vec3(.866 * P.x + .5 * P.z, P.y + 100., -.5 * P.x + .866 * P.z);
      }
      return f;
   }

vec3 backgroundColor(vec3 dir)
{
    float t = .5 - .5 * dir.y;
    return mix(uBackground[0], uBackground[1], 1. - t * t);
}

vec2 raytraceSphere(vec3 V, vec3 W, Sphere S) {
   V -= S.center;
   float B = 2. * dot(V, W);
   float C = dot(V, V) - S.radius * S.radius;
   float discrim = B*B - 4.*C;
   vec2 t = vec2(1000., 1000.);
   if (discrim > 0.)
      t = vec2(-B - discrim, -B + discrim) / 2.;
   return t.x > 0. ? t : vec2(1000., 1000.);
}

vec3 phong(vec3 P, vec3 N, vec3 E, Material C) {
   vec3 c = C.ambient * backgroundColor(N);            // Ambient color
   for (int i = 0 ; i < NLIGHTS ; i++) { // Loop through lights
      vec3 L = normalize(uLights[i].direction);
      vec2 t;
      for (int j = 0 ; j < NSPHERES ; j++) {           // Loop through spheres.
         t = raytraceSphere(P+.001*L, L, uSpheres[j]); // If any casts a shadow
         if (t.x < 1000.)                              // then stop looping.
            break;
      }
      if (t.x == 1000.) {                              // If not in shadow:
         float d = max(0., dot(N, L));       // Diffuse value
         vec3  R = reflect(-L, N);
         float s = pow(max(0., dot(E, R)), C.power);       // Specular value
         c += uLights[i].color * (d * C.diffuse + s * C.specular * .1*C.power);
      }
   }
   return c;
}

Material C;
vec3 V, W, P, E, N;
vec3 nvPos;

bool raytrace() {
   float distance = 1000.;
   for (int i = 0 ; i < NSPHERES ; i++) {
      vec2 t = raytraceSphere(V, W, uSpheres[i]);
      if (t.x < distance) {
         C = uSpheres[i].material;                // Material for this object
         P = V + t.x * W;                         // Point on sphere
         E = -normalize(P);                       // Direction to eye
         N = normalize(P - uSpheres[i].center * turbulence(P + uTime / 5.));   // Surface normal
         distance = t.x;
      }
   }
   return distance < 1000.;
}

void main() {
   vec3 c = vec3(0.,0.,0.);
   nvPos = vPos;
   nvPos.x = vPos.x / uAspc;
   V = vec3(0.,0.,0.);                         // Ray origin
   W = normalize(vec3(nvPos.xy, -3.));          // Ray direction
   if (! raytrace())
      c = backgroundColor(nvPos);
   else
      for (int bounce = 0 ; bounce < 5 ; bounce++) {
         float attenuation = pow(0.6, float(bounce + 1));
         c += attenuation * phong(P, N, E, C);
         c += .5 * attenuation * backgroundColor(W);
         V = P + .001 * W;
         W = reflect(W, N);
         if (! raytrace())
            break;
      }

   gl_FragColor = vec4(sqrt(c), 1.);           // Final pixel color
}
</script>

<script>
window.onload = function() {
    var text = {
        uSpheresLength: 2,
        uLightsLength: 2,
        Init: function(gl, program) {
            var uSpheres = [];
            for (var i = 0; i < this.uSpheresLength; i++) {
                var name = 'uSpheres[' + i + ']';
                uSpheres.push({
                    center: gl.getUniformLocation(program, name +
                        '.center'),
                    radius: gl.getUniformLocation(program, name +
                        '.radius'),
                    material: {
                        ambient: gl.getUniformLocation(program, name +
                            '.material.ambient'),
                        diffuse: gl.getUniformLocation(program, name +
                            '.material.diffuse'),
                        specular: gl.getUniformLocation(program, name +
                            '.material.specular'),
                        power: gl.getUniformLocation(program, name +
                            '.material.power')
                    },
                });
            }
            this.uSpheres = uSpheres;

            var uLights = [];
            for (var i = 0; i < this.uLightsLength; i++) {
                var name = 'uLights[' + i + ']';
                uLights.push({
                    direction: gl.getUniformLocation(program, name +
                        '.direction'),
                    color: gl.getUniformLocation(program, name +
                        '.color'),
                });
            }
            this.uLights = uLights;

            var uBackground = [];
            for (var i = 0; i < 2; i++) {
                var name = 'uBackground[' + i + ']';
                uBackground.push({
                    color: gl.getUniformLocation(program, name),
                });
            }
            this.uBackground = uBackground;

            function mix(a, b, t) {
                return a + t * (b - a);
            }

            for (var i = 0; i < 2; i++) {
                gl.uniform3f(this.uBackground[i].color, .0 + i, .3, .2);
            }

            var a = [1, .8, 0];
            for (var i = 0; i < 1; i++) {
                let j = (i + 1) % 3,
                    k = (i + 2) % 3;
                gl.uniform1f(this.uSpheres[i].radius, .5);
                gl.uniform1f(this.uSpheres[i].material.power, 5);
                gl.uniform3f(this.uSpheres[i].center, 0, 0, -3 );

                gl.uniform3f(this.uSpheres[i].material.ambient, .1, 1, 1);
                gl.uniform3f(this.uSpheres[i].material.diffuse, .1, 1, 1);
                gl.uniform3f(this.uSpheres[i].material.specular, .1, 1, 1);
            }
            var d = [[0.1853371713575067, -0.17790843487407182,
            0.14005553439343466], [0.4627999755019967, -0.3534428687457365,
            -0.014201824316436129]];

            for (var i = 0; i < 2; i++) {
                let t = .5 - .5 * d[i][1] / Math.sqrt(d[i][0] * d[i][0] + d[i][1] * d[i][1] + d[i][2] * d[i][2]);
                t = 1 - t * t;
                gl.uniform3f(this.uLights[i].direction, d[i][0], d[i][1], d[i][2]);
                gl.uniform3f(this.uLights[i].color, .5 * mix(1, .05, t), .5 * .05, .5 * mix(.05, .5, t));
            }
        },
        Update: function(gl) {

        }
    };

    var vs = vs_script.innerHTML,
        fs = fs_script.innerHTML;

    addTextEditor(fs, function() {
        canvas.setShaders(vs, this.value);
    });

    gl_start(canvas, vs, fs, text);
};

</script>
