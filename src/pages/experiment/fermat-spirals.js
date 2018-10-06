import React, { Component } from 'react'
import { ExperimentLayout } from '../../components/layout'
import { renderCircle } from '../../shape-rendering'
import { pixeltocord } from '../../math'

class FermatSpirals extends Component {
  state = {
    size: 2,
    color: '#e23232',
    scaling_factor: 0.004,
    angle: 137.508,
    count: 10000,
  }

  componentDidMount = () => {
    let canvas = document.getElementById('canvas')
    this.setState({ cavnas })
    this.defineCanvasProperties(canvas)
  }

  resize = () => {
    var { canvas } = this.state
    // Lookup the size the browser is displaying the canvas.
    var displayWidth = canvas.parentNode.clientWidth
    var displayHeight = canvas.parentNode.clientHeight

    // Check if the canvas is not the same size.
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      // Make the canvas the same size
      canvas.width = displayWidth
      canvas.height = displayHeight

      canvas.style.width = displayWidth + 'px'
      canvas.style.height = displayHeight + 'px'
    }

    return displayHeight / displayWidth
  }

  defineCanvasProperties = canvas => {
    canvas.cursor = {
      x: 0,
      y: 0,
      z: 0,
    }
    canvas.setCursor = function(x, y, z) {
      var r = this.getBoundingClientRect()
      this.cursor.x = x - r.left
      this.cursor.y = y - r.top
      if (z !== undefined) this.cursor.z = z
    }
    canvas.onmousedown = function(e) {
      this.setCursor(e.clientX, e.clientY, 1)
    }
    canvas.onmousemove = function(e) {
      this.setCursor(e.clientX, e.clientY)
    }
    canvas.onmouseup = function(e) {
      this.setCursor(e.clientX, e.clientY, 0)
    }
  }

  draw = ctx => {
    ctx.fillStyle = this.state.color
    let { count, scaling_factor, angle, size } = this.state
    for (var i = 0; i < count; i++) {
      let r = scaling_factor * Math.sqrt(i)
      let theta = i * angle
      renderCircle(ctx, r, d2r(theta), size)
    }
  }

  drawCanvas = canvas => {
    defineCanvasProperties(canvas)
    setInterval(function() {
      this.resize()
      if (canvas.update) {
        context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
        canvas.update(context)
      }
    }, 90)
  }

  render = () => <ExperimentLayout title="Fermat Spirals" color="4499d6" />
}

export default FermatSpirals
