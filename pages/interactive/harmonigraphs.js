function h(frequency, phase, amplitude, damping, time) {
  return (
    amplitude *
    Math.sin(time * frequency + phase) *
    Math.exp(-1 * damping * time)
  );
}
let path = new Path();
path.strokeColor = "black";
let timeStepSize = 0.0001;
let totalCycles = 10.0;

let xFreq = Math.random() * 200;
let xPhase = Math.random() * 200;
let xAmp =  Math.random() * 600 + 50;
let xDamp = Math.random();
console.log(xFreq, xPhase, xAmp, xDamp)

let yFreq = Math.random() * 200;
let yPhase = Math.random() * 200;
let yAmp = Math.random() * 600 + 50;
let yDamp = Math.random();
console.log(yFreq, yPhase, yAmp, yDamp)

let last = new Point();

for (let time = 0.0; time < totalCycles; time += timeStepSize) {
  let x = h(xFreq, xPhase, xAmp, xDamp, time);
  let y = h(yFreq, yPhase, yAmp, yDamp, time);
  let current = new Point(x, y);
  if (last !== new Point()) {
    path.add(current);
  }
  last = current;
}

project.activeLayer.transform(
  new Matrix(1, 0, 0, -1, view.center.x, view.center.y)
);
