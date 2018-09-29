---
layout: webgl
title: Mandelbrot
featuredImage: "./feature.jpeg"
webgl: true
datgui: true
date: 2017-04-01
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
    nvPos.x = vPos.x / uAspc;
    nvPos.x -= 0.5;
    if(u_smooth_coloring){
        gl_FragColor = vec4( smooth_mandelbrot(nvPos.xy), 1.0 );
    } else {
        gl_FragColor = vec4( simple_mandelbrot(nvPos.xy), 1.0 );
    }
}

</script>

<script>
window.onload = function(){
    var vs = vs_script.innerHTML, fs = fs_script.innerHTML;

    var text = {
        iterations: 100,
        color: [93, 117, 179],
        variation: 0.2,
        threshold: 100.0,
        smooth_coloring: true,
        Init: function(gl, program) {
            this.u_iterations = gl.getUniformLocation(program, "u_iterations");
            this.u_variation = gl.getUniformLocation(program, "u_variation");
            this.u_color = gl.getUniformLocation(program, "u_color");
            this.u_threshold = gl.getUniformLocation(program, "u_threshold");
            this.u_smooth_coloring = gl.getUniformLocation(program, "u_smooth_coloring");
        },
        Update: function(gl) {
            gl.uniform3fv(this.u_color, this.color);
            gl.uniform1i(this.u_iterations, this.iterations);
            gl.uniform1f(this.u_variation, this.variation);
            gl.uniform1f(this.u_threshold, this.threshold);
            gl.uniform1f(this.u_smooth_coloring, this.smooth_coloring);
        },
        random: function(){
            this.iterations = Math.random() * 100 + 1;
            this.variation = Math.random();
            this.threshold = Math.random() * 95 + 5;
            this.color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
            this.smooth_coloring = Math.random() > 0.5 ? true : false;
        }
    };

    var gui = new dat.GUI();
    gui.addColor(text, 'color').listen();
    gui.add(text, 'iterations', 1, 100).listen();
    gui.add(text, 'variation', 0, 1).listen();
    gui.add(text, 'threshold', 5, 100).listen();
    gui.add(text, 'smooth_coloring').listen();
    gui.add(text, 'random');


    gl_start(canvas, vs, fs, text);
};
</script>
