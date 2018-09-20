---
layout: webgl
title: Editable Splines
image: /public/experiments/splines.jpeg
date: 2017-04-13
excerpt: Made with Canvas
datgui: true
instructions: "Points are added by clicking, other controls in top right."
---

<style>
.webgl-container {
    background: #e0e0c5;
}
.details-container {
    pointer-events: none;
}
.nav {
    pointer-events: auto;
}
</style>

<script>

{% include matrix.js %}
{% include spline_editor.js %}
</script>
