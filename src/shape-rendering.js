const renderCircle = (ctx, r, theta, s) => {
  var p = cordtopixel(p2c(r, theta))
  ctx.beginPath()
  ctx.arc(p[0], p[1], s, 0, Math.PI * 2, true)
  ctx.fill()
}
