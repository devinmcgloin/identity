import React, { Component } from 'react'
import { ExperimentLayout } from '../../components/layout'
import { renderCircle } from '../../shape-rendering'
import { d2r } from '../../math'

import * as dg from 'dis-gui'

class FermatSpirals extends Component {
  state = {
    size: 2,
    color: '#e23232',
    scaling_factor: 0.009,
    angle: 137.508,
    count: 10000,
  }

  componentDidMount = () => {
    let canvas = document.getElementById('canvas')
    this.setState({ canvas })
    this.setupCanvas(canvas)
  }

  resize = canvas => {
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

  draw = (ctx, w, h) => {
    let { color, count, scaling_factor, angle, size } = this.state
    ctx.fillStyle = color
    for (var i = 0; i < count; i++) {
      let r = scaling_factor * Math.sqrt(i)
      let theta = i * angle
      renderCircle(ctx, w, h, r, d2r(theta), size)
    }
  }

  updateCanvas = canvas => {
    this.resize(canvas)
    let context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    this.draw(context, canvas.width, canvas.height)
  }

  setupCanvas = canvas => {
    this.defineCanvasProperties(canvas)
    setInterval(() => this.updateCanvas(canvas), 90)
  }

  render = () => {
    const state = this.state
    return (
      <ExperimentLayout title="Fermat Spirals" color="#4499d6">
        <dg.GUI
          style={{
            top: '9px',
            right: '9px',
            backgroundColor: '#FFF',
            lowlight: '#DDD',
            lowlighterr: '#FBB',
            highlight: '#444',
            separator: '1px solid #DDD',
            label: {
              fontColor: '#444',
              fontWeight: 'normal',
            },
          }}
        >
          <dg.Number
            path="size"
            label="Size"
            value={state.size}
            min={1}
            max={10}
            step={1}
            onChange={v => this.setState({ size: v })}
          />
          <dg.Number
            path="scaling_factor"
            label="Scaling Factor"
            value={state.scaling_factor}
            min={0.001}
            max={0.02}
            onChange={v => this.setState({ scaling_factor: v })}
          />
          <dg.Number
            path="angle"
            label="Angle"
            value={state.angle}
            min={0}
            max={180}
            step={1}
            onChange={v => this.setState({ angle: v })}
          />
          <dg.Number
            path="count"
            label="Count"
            value={state.count}
            min={1}
            max={20000}
            step={100}
            onChange={v => this.setState({ count: v })}
          />
          <dg.Color
            path="color"
            label="Dot Color"
            value={state.color}
            onChange={v => this.setState({ color: v })}
          />
        </dg.GUI>
      </ExperimentLayout>
    )
  }
}

export default FermatSpirals
