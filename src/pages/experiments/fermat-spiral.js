import React, { Component } from 'react'
import { ExperimentLayout } from '../../components/layout'
import { renderCircle } from '../../shape-rendering'
import { d2r } from '../../math'
import DatGui, { DatNumber, DatColor } from 'react-dat-gui'
import 'react-dat-gui/build/react-dat-gui.css'

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
    this.setupCanvas(canvas)
  }

  shouldComponentUpdate = () => false

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

  update = data => this.setState({ ...data })

  render = () => {
    const state = this.state
    return (
      <ExperimentLayout title="Fermat Spirals" color="#4499d6">
        <DatGui data={state} onUpdate={this.update}>
          <DatNumber path="size" label="Size" min={1} max={10} step={1} />
          <DatNumber
            path="scaling_factor"
            label="Scaling Factor"
            min={0.001}
            max={0.02}
            step={0.001}
          />
          <DatNumber path="angle" label="Angle" min={0} max={180} step={1} />
          <DatNumber
            path="count"
            label="Count"
            min={1}
            max={20000}
            step={100}
          />
          <DatColor path="color" label="Dot Color" />
        </DatGui>
      </ExperimentLayout>
    )
  }
}

export default FermatSpirals
