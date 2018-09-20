---
layout: webgl
title: Fermat's Spirals
image: /public/experiments/fermat-spiral.jpeg
date: 2017-08-11
excerpt: Made with Canvas
datgui: true
---

<style>
.webgl-container {
    background: #4499d6;
}
</style>

<script>
var startTime = Date.now() / 1000,
    time = startTime;

function resize() {
    var canvas = document.getElementById("canvas");
    // Lookup the size the browser is displaying the canvas.
    var displayWidth = canvas.parentNode.clientWidth;
    var displayHeight = canvas.parentNode.clientHeight;

    // Check if the canvas is not the same size.
    if (canvas.width !== displayWidth ||
        canvas.height !== displayHeight) {

        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;

        canvas.style.width = displayWidth + "px";
        canvas.style.height = displayHeight + "px";
    }

    return displayHeight / displayWidth;
}

function defineCanvasProperties(canvas) {
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

function drawCanvases(canvases) {
    window.canvases = canvases;
    for (var i = 0; i < canvases.length; i++)
        defineCanvasProperties(canvases[i]);
    setInterval(function() {
        resize();
        var i, canvas, context;
        time = Date.now() / 1000 - startTime;
        for (i = 0; i < canvases.length; i++)
            if ((canvas = canvases[i]).update) {
                context = canvas.getContext("2d");
                context.clearRect(0, 0, canvas.width, canvas.height);
                canvas.update(context);
            }
    }, 90);
}

function p2c(r, theta) {
    return [r * Math.cos(theta), r * Math.sin(theta), 0]
}
var d2r = function(theta) {
    return theta * Math.PI / 180;
}

function pixeltocord(p) {
    var w = canvas.width,
        h = canvas.height,
        x = p[0],
        y = p[1],
        z = p[2],
        fl = 5;
    x = (2 * x) / w - 1;
    y = (h - 2 * y) / w;
    x = x - (x * z) / fl;
    y = y - (y * z) / fl;
    return [x, y, 0];
}

function cordtopixel(c) {
    var w = canvas.width,
        h = canvas.height,
        x = c[0],
        y = c[1],
        z = c[2],
        fl = 5;

    x *= fl / (fl - z);
    y *= fl / (fl - z);

    x = w * x * 0.5 + 0.5 * w;
    y = -w * y * 0.5 + 0.5 * h;
    return [x, y, 0]


}

var boids, gui, params;

function renderCircle(ctx, r, theta, s) {
    var p = cordtopixel(p2c(r, theta));
    ctx.beginPath();
    ctx.arc(p[0], p[1], s, 0, Math.PI * 2, true);
    ctx.fill();
}

function render(ctx) {
    ctx.fillStyle = params.color;
    for (var i = 0; i < params.count; i++) {
        let r = params.scaling_factor * Math.sqrt(i);
        let theta = i * params.angle;
        renderCircle(ctx, r, d2r(theta), params.size);
    }
}

window.onload = function() {
    params = {
        size: 2,
        color: '#e23232',
        scaling_factor: 0.004,
        angle: 137.508,
        count: 10000
    }
    defineCanvasProperties(canvas);
    gui = new dat.GUI();
    gui.add(params, 'size', 1, 10);
    gui.add(params, 'scaling_factor', 0.001, 0.02);
    gui.add(params, 'angle', 0, 180);
    gui.add(params, 'count', 1, 20000);
    gui.addColor(params, 'color');
    canvas.update = render;
    drawCanvases([canvas]);
}
</script>
