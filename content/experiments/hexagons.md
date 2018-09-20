---
layout: webgl
title: Hexagons
image: /public/experiments/hexagons.jpeg
date: 2017-03-23
excerpt: Made with Canvas
---

<style>
.webgl-container {
    background: #000;
}
</style>

<script>

{% include matrix.js %}
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


function draw2DCanvases(canvases) {
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
                canvas.update(context);
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

canvas.update = function(g) {

    function drawCurve(c, shd, strk) {
        var i, cv, x, y, z, fl = 5,
            w = canvas.width,
            h = canvas.height;

        cv = [];
        for (i = 0; i < c.length; i++) {

            // RETRIEVE COORDINATES FROM CURVE POINT

            x = c[i][0];
            y = c[i][1];
            z = c[i][2];

            // DO PERSPECTIVE TRANSFORM

            x *= fl / (fl - z);
            y *= fl / (fl - z);

            // DO VIEWPORT TRANSFORM

            x = w * x * .5 + .5 * w;
            y = -w * y * .5 + .5 * h;
            cv.push([x, y, 0]);
        }

        // DRAW THE PROJECTED CURVE ONTO THE CANVAS.
        g.lineWidth = 15;
        g.lineCap = 'round';
        g.lineJoin = 'round';
        g.shadowBlur = 20;
        g.shadowColor = shd;
        g.strokeStyle = strk;

        g.beginPath();
        g.moveTo(cv[0][0], cv[0][1]);
        for (i = 1; i < c.length; i++)
            g.lineTo(cv[i][0], cv[i][1]);
        g.stroke();
    }

    var p2c = function(r, theta) {
        return [r * Math.cos(theta), r * Math.sin(theta), 0]
    }

    var d2r = function(theta) {
        return theta * Math.PI / 180;
    }

    var hexagon = function(c) {
        var p = [
            p2c(c, d2r(60)),
            p2c(c, d2r(120)),
            p2c(c, d2r(180)),
            p2c(c, d2r(240)),
            p2c(c, d2r(300)),
            p2c(c, d2r(360)),
            p2c(c, d2r(60))
        ];
        return p;
    }



    var centerX = canvas.width / 2,
        centerY = canvas.height / 2,
        offset = 300,
        shadowLum = Math.floor(Math.abs(225 * Math.sin(Math.pow(time, time)))),
        colorLum = Math.max(Math.floor(Math.abs(255 * Math.sin(time))), 100),
        alphaLum = Math.abs(Math.sin(time)),
        rShd = 'rgba(' + shadowLum + ', 20, 20,' + alphaLum + ')',
        rCol = 'rgba( 255 , 20, 20, .9)',
        yShd = 'rgba(' + shadowLum + ',' + shadowLum + ', 20,' + alphaLum + ')',
        yCol = 'rgba(255, 255, 20, 0.9)';

        m = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var drawHex = function(size, speed, rX, rY, shd, col){
        var h = hexagon(size);

        // TRANSFORM THE CUBE FOR THIS ANIMATION FRAME.
        M.identity(m);
        M.rotateY(m, time * speed);
        M.rotateX(m, time * speed * 2);
        M.rotateX(m, rX);
        M.rotateY(m, rY);
        M.scale(m, .3);
        // TRANSFORM THE POINTS OF THE CURVE.

        for (i = 0; i < h.length; i++)
            h[i] = M.transform(m, h[i]);

        // DRAW THE CURVE.
        drawCurve(h, shd, col);

    }

    drawHex(1, .9, 180, 0, rShd, rCol);
    drawHex(1, .9, 0  , 0, rShd, rCol);
    drawHex(1, .9, 90,  0, rShd, rCol);
    drawHex(1, .9, 90,  90, rShd, rCol);
}

draw2DCanvases([canvas]);
</script>
