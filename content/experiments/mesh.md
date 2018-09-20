---
layout: webgl
title: Mesh
image: /public/experiments/mesh.jpeg
date: 2017-03-27
excerpt: Made with Canvas and Parametric Surfaces
datgui: true
---

<style>
.webgl-container {
    background: #000;
}
</style>

<script>
{% include matrix.js %}
{% include shapes.js %}


var startTime = Date.now() / 1000,
    time = startTime;

function resize() {
    var canvas = document.getElementById('canvas');
    // Lookup the size the browser is displaying the canvas.
    var displayWidth = canvas.parentNode.clientWidth;
    var displayHeight = canvas.parentNode.clientHeight;

    // Check if the canvas is not the same size.
    if (canvas.width != displayWidth ||
        canvas.height != displayHeight) {

        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;

        canvas.style.width = displayWidth + 'px';
        canvas.style.height = displayHeight + 'px';
    }

    return displayHeight / displayWidth;
}


function draw2DCanvases(canvases, conf) {
    for (var i = 0; i < canvases.length; i++)
        trackCursor(canvases[i]);
    setInterval(function() {
        resize();
        var i, canvas, context;
        time = Date.now() / 1000 - startTime;
        for (i = 0; i < canvases.length; i++)
            if ((canvas = canvases[i]).update) {
                context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
                canvas.update(context, conf[i]);
            }
    }, 30);
}

function trackCursor(canvas) {
    canvas.cursor = {
        x: 0,
        y: 0,
        z: 0
    };
    canvas.setCursor = function(x, y, z) {
        var r = this.getBoundingClientRect();
        this.cursor.x = x - r.left;
        this.cursor.y = y - r.top;
        if (z !== undefined)
            this.cursor.z = z;
    }
    canvas.onmousedown = function(e) {
        this.setCursor(e.clientX, e.clientY, 1);
    }
    canvas.onmousemove = function(e) {
        this.setCursor(e.clientX, e.clientY);
    }
    canvas.onmouseup = function(e) {
        this.setCursor(e.clientX, e.clientY, 0);
    }
}
window.onload = function(){
    var m = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var conf = [{}];
    var gui = new dat.GUI(),
        c1 = conf[0];
    c1.Type = "Sphere";
    c1.Color = "rgb(255, 255, 255)";
    c1.lineWidth = 1;
    c1.scale = .3;
    c1.nu = 20;
    c1.nv = 20;
    console.log(c1);
    gui.add(c1, 'Type', ["Sphere", "Hemisphere", "Cone", "Torus", "Plane", "Paraboloid", "Tube"]); 
    gui.add(c1, 'lineWidth', 1, 10);
    gui.add(c1, 'scale', 0.1, 2);
    gui.add(c1, 'nv', 1, 100);
    gui.add(c1, 'nu', 1, 100);
    gui.addColor(c1, 'Color');
    canvas.update = function(g, conf) {
        var p, C, c, canvas = this;

        // DRAW A SET OF CURVES IN 3D WITH PERSPECTIVE PROJECTION.

        function drawCurves(m, C) {
            var i, n, p, cv, x, y, z, fl = 5,
                w = canvas.width;
            h = canvas.height;

            // LOOP THROUGH CURVES.

            for (n = 0; n < C.length; n++) {

                // BUILD THE PROJECTED CURVE, POINT BY POINT.

                cv = [];
                for (i = 0; i < C[n].length; i++) {

                    // TRANSFORM POINT

                    p = M.transform(m, C[n][i]);

                    // RETRIEVE COORDINATES FROM TRANSFORMED POINT

                    x = p[0];
                    y = p[1];
                    z = p[2];

                    // DO PERSPECTIVE TRANSFORM

                    x *= fl / (fl - z);
                    y *= fl / (fl - z);

                    // DO VIEWPORT TRANSFORM

                    x = w * x * .5 + .5 * w;
                    y = -w * y * .5 + .5 * h;
                    cv.push([x, y]);
                }

                // DRAW THE PROJECTED CURVE ONTO THE CANVAS.

                g.beginPath();
                g.moveTo(cv[0][0], cv[0][1]);
                for (i = 1; i < cv.length; i++)
                    g.lineTo(cv[i][0], cv[i][1]);
                g.stroke();
            }
        }

        g.lineCap = 'round';
        g.lineJoin = 'round';
        g.strokeStyle = conf.Color;
        g.lineWidth = conf.lineWidth;

        M.identity(m);
        M.scale(m, conf.scale);

        M.save(m);
        M.rotateY(m, time);
        M.rotateX(m, time / 2);
        //M.translate(m, [1, 1, 0]);

        switch(conf.Type){
            case "Torus":
                drawCurves(m, S.parametricMesh(S.torus, conf.nu, conf.nv));
                break;
            case "Sphere":
                drawCurves(m, S.parametricMesh(S.sphere(), conf.nu, conf.nv));
                break;
            case "Hemisphere":
                drawCurves(m, S.parametricMesh(S.sphere(1), conf.nu, conf.nv));
                break;
            case "Cone":
                drawCurves(m, S.parametricMesh(S.cone(2), conf.nu, conf.nv));
                break;
             case "Plane":
                drawCurves(m, S.parametricMesh(S.plane(2, 2, 2, 2), conf.nu, conf.nv));
                break;
            case "Paraboloid":
                drawCurves(m, S.parametricMesh(S.paraboloid(1), conf.nu, conf.nv));
                break;
            case "Tube":
                drawCurves(m, S.parametricMesh(S.tube, conf.nu, conf.nv));
                break;
        }

        M.restore(m);
    }

    draw2DCanvases([canvas], conf);
}
</script>
