---
layout: webgl
title: Neon
featuredImage: "./feature.jpeg"
date: 2017-03-07
excerpt: Made with Canvas
---

<style>
.webgl-container {
    background: #000;
}
</style>

<script>
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

    var d = function(x1, y1, x2, y2, shd, strk) {
        g.lineWidth = 15;
        g.lineCap = 'round';
        g.lineJoin = 'round';
        g.shadowBlur = 20;
        g.shadowColor = shd;
        g.strokeStyle = strk;
        g.beginPath();
        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        g.stroke();
        g.closePath();
    }

    var centerX = canvas.width / 2,
        centerY = canvas.height / 2,
        offset = 300,
        shadowLum = Math.floor(Math.abs(225 * Math.sin(Math.pow(time,time)))),
        colorLum = Math.max(Math.floor(Math.abs(255 * Math.sin(time))), 100),
        alphaLum = Math.abs(Math.sin(time)),
        rShd = 'rgba(' + shadowLum + ', 20, 20,' + alphaLum + ')',
        rCol = 'rgba(' + colorLum  + ', 20, 20,' + alphaLum + ')',
        yShd = 'rgba(' + shadowLum + ',' + shadowLum + ', 20,' + alphaLum + ')',
        yCol = 'rgba(' + colorLum  + ',' + colorLum  + ', 20,' + (alphaLum + 0.01)
        +')';

    d(centerX - offset, centerY,
      centerX + offset, centerY, rShd, rCol);

    for(var i = 1; i < 5; i++){
        d(centerX - offset, centerY - i*35,
          centerX + offset, centerY - i*35,
          rShd, rCol);
        if(i === 2){
            d(centerX + (offset - 100), centerY - 5*35, centerX - (offset - 100), centerY + 5*35, yShd, yCol);
        }
        d(centerX - offset, centerY + i*35,
          centerX + offset, centerY + i*35,
          rShd, rCol);
    }

}

draw2DCanvases([canvas]);
</script>
