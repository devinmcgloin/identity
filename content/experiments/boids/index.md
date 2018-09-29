---
layout: webgl
title: Boids
featuredImage: "./feature.jpeg"
date: 2017-05-11
excerpt: Made with Canvas
datgui: true
---

<style>
.webgl-container {
    background: #4499d6;
}
</style>

<script>
{% include boids.js %}

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
    }, 30);
}

var boids, gui;

window.onload = function() {
    defineCanvasProperties(canvas);
    boids = new Swarm(canvas.getContext("2d"));
    gui = new dat.GUI();
    gui.addColor(boids, 'background');
    gui.add(boids, 'numBoids', 10, 1000).step(1);


    var yellow = gui.addFolder('Yellow Swarm'),
        salmon= gui.addFolder('Salmon Swarm'),
        pred = gui.addFolder('Predator');


    var controllers = [];
    controllers.push(yellow.addColor(boids.config.yellow, 'fillStyle'));
    controllers.push(yellow.add(boids.config.yellow, 'radius', 1, 15));
    controllers.push(yellow.add(boids.config.yellow, 'radialSpeed', .00005, .3));
    controllers.push(yellow.add(boids.config.yellow, 'speed', 1, 10));
    controllers.push(yellow.add(boids.config.yellow, 'vision', 10, 200));
    controllers.push(salmon.addColor(boids.config.salmon , 'fillStyle'));
    controllers.push(salmon.add(boids.config.salmon, 'radius', 1, 15));
    controllers.push(salmon.add(boids.config.salmon, 'radialSpeed', .00005, .3));
    controllers.push(salmon.add(boids.config.salmon, 'speed', 1, 10));
    controllers.push(salmon.add(boids.config.salmon, 'vision', 10, 200));
    for (var i = 0; i < controllers.length; i++)
        controllers[i].onChange(function(value) {
            boids.update();
        });

    controllers = [];
    pred.add(boids, 'activePred');
    controllers.push(pred.add(boids.config.pred, 'radius', 1, 15));
    controllers.push(pred.add(boids.config.pred, 'radialSpeed', .00005, .3));
    controllers.push(pred.add(boids.config.pred, 'speed', 1, 10));
    controllers.push(pred.add(boids.config.pred, 'vision', 10, 200));
    controllers.push(pred.addColor(boids.config.pred, 'fillStyle'));
     for (var i = 0; i < controllers.length; i++)
        controllers[i].onChange(function(value) {
            boids.updatePred();
        });


    boids.id = setInterval(boids.animate, 50);
    boids.animate();
    boids.clear();
    boids.createBoids(600);
}

</script>
