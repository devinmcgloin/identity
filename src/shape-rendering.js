import { cordtopixel, p2c } from './math'

const renderCircle = (ctx, w, h, r, theta, s) => {
  var p = cordtopixel(w, h, p2c(r, theta))
  ctx.beginPath()
  ctx.arc(p[0], p[1], s, 0, Math.PI * 2, true)
  ctx.fill()
}

export { renderCircle }
