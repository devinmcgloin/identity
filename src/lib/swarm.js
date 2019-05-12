/* Core algorithm comes from https://github.com/skeeto/boids-js. Modified for my uses here */

// TODO set this up so that the number of boids in the swarm can be resized
// TODO allow boids to reproduce with new values

class Boid {
  constructor(swarm, type) {
    this.x = Math.random() * swarm.width;
    this.y = Math.random() * swarm.height;
    this.heading = Math.random() * 2 * Math.PI - Math.PI;
    this.type = type;
    this.fillStyle =
      type === 'salmon' ? '#fa9466' : type === 'pred' ? '#f44141' : '#f4bf42';
    this.radius = 6;
    this.speed = 2;
    this.radialSpeed = Math.PI / 60;
    this.vision = 50;
  }

  update = function(config) {
    this.fillStyle = config.fillStyle;
    this.radius = config.radius;
    this.speed = config.speed;
    this.radialSpeed = config.radialSpeed;
    this.vision = config.vision;
  };

  draw = function(ctx) {
    var pointLen = this.radius * 2.5;
    ctx.fillStyle = this.fillStyle;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(
      this.x + Math.cos(this.heading + Math.PI / 2) * this.radius,
      this.y + Math.sin(this.heading + Math.PI / 2) * this.radius
    );
    ctx.lineTo(
      this.x + Math.cos(this.heading + Math.PI) * pointLen,
      this.y + Math.sin(this.heading + Math.PI) * pointLen
    );
    ctx.lineTo(
      this.x + Math.cos(this.heading - Math.PI / 2) * this.radius,
      this.y + Math.sin(this.heading - Math.PI / 2) * this.radius
    );
    ctx.fill();
  };

  distance = function(boid, width, height) {
    var x0 = Math.min(this.x, boid.x),
      x1 = Math.max(this.x, boid.x);
    var y0 = Math.min(this.y, boid.y),
      y1 = Math.max(this.y, boid.y);
    var dx = Math.min(x1 - x0, x0 + width - x1);
    var dy = Math.min(y1 - y0, y0 + height - y1);
    return Math.sqrt(dx * dx + dy * dy);
  };

  getNeighbors = function(swarm) {
    var w = swarm.width,
      h = swarm.height;
    var neighbors = [];

    for (var i = 0; i < swarm.boids.length; i++) {
      var boid = swarm.boids[i];

      if (this !== boid && this.distance(boid, w, h) < this.vision) {
        neighbors.push(boid);
      }
    }

    return neighbors;
  };

  static wrap = function(value) {
    var min, max;

    if (arguments.length === 2) {
      min = 0;
      max = arguments[1];
    } else if (arguments.length === 3) {
      min = arguments[1];
      max = arguments[2];
    } else {
      throw new Error('wrong number of arguments');
    }

    while (value >= max) value -= max - min;

    while (value < min) value += max - min;

    return value;
  };

  static clamp = function(value, limit) {
    return Math.min(limit, Math.max(-limit, value));
  };

  static meanAngle = function() {
    var sumx = 0,
      sumy = 0,
      len = arguments.length;

    for (var i = 0; i < len; i++) {
      sumx += Math.cos(arguments[i]);
      sumy += Math.sin(arguments[i]);
    }

    return Math.atan2(sumy / len, sumx / len);
  };

  step = function(swarm) {
    var w = swarm.width,
      h = swarm.height;
    var neighbors = this.getNeighbors(swarm);

    if (neighbors.length > 0) {
      var meanhx = 0,
        meanhy = 0;
      var meanx = 0,
        meany = 0;
      var mindist = this.radius * 2,
        min = null;

      for (var i = 0; i < neighbors.length; i++) {
        var boid = neighbors[i];
        meanhx += Math.cos(boid.heading);
        meanhy += Math.sin(boid.heading);
        meanx += boid.x;
        meany += boid.y;
        var dist = this.distance(boid, w, h);

        if (dist < mindist) {
          mindist = dist;
          min = boid;
        }
      }

      meanhx /= neighbors.length;
      meanhy /= neighbors.length;
      meanx /= neighbors.length;
      meany /= neighbors.length;
      var target;

      var nearPred =
        swarm.activePred &&
        this.type !== 'pred' &&
        this.distance(swarm.pred, w, h) < this.vision * 2;
      var eaten =
        swarm.activePred &&
        this.type !== 'pred' &&
        this.distance(swarm.pred, w, h) < swarm.pred.radius;
      if (min && this.type !== 'pred') {
        // Keep away!
        target = Math.atan2(this.y - min.y, this.x - min.x);
      } else {
        // Match heading and move towards center
        var meanh = Math.atan2(meanhy, meanhx);
        var center = Math.atan2(meany - this.y, meanx - this.x);
        target = Boid.meanAngle(meanh, meanh, meanh, center);
      }

      var delta;
      // Move in this direction
      if (eaten) {
        this.x = Math.random() * swarm.width;
        this.y = Math.random() * swarm.height;
      } else if (nearPred) {
        target = Math.atan2(this.y - swarm.pred.y, this.x - swarm.pred.x);
        delta = Boid.wrap(target - this.heading, -Math.PI, Math.PI);
        delta = Boid.clamp(delta, this.radialSpeed);
        this.heading = Boid.wrap(this.heading + delta, -Math.PI, Math.PI);
      } else {
        delta = Boid.wrap(target - this.heading, -Math.PI, Math.PI);
        delta = Boid.clamp(delta, this.radialSpeed);
        this.heading = Boid.wrap(this.heading + delta, -Math.PI, Math.PI);
      }
    }

    this.move(swarm);
  };

  move = function(swarm) {
    var padding = swarm.padding;
    var width = swarm.width,
      height = swarm.height;
    this.x = Boid.wrap(
      this.x + Math.cos(this.heading) * this.speed,
      -padding,
      width + padding * 2
    );
    this.y = Boid.wrap(
      this.y + Math.sin(this.heading) * this.speed,
      -padding,
      height + padding * 2
    );
  };
}

class Swarm {
  constructor(ctx) {
    this.ctx = ctx;
    this.boids = [];
    this.numBoids = 600;
    this.background = '#4499d6';
    this.startTime = Date.now() / 1000;
    this.time = this.startTime;
    this.config = {
      yellow: {
        fillStyle: '#f4bf42',
        radius: 6,
        speed: 2,
        radialSpeed: Math.PI / 60,
        vision: 50,
      },
      salmon: {
        fillStyle: '#fa9466',
        radius: 6,
        speed: 3,
        radialSpeed: Math.PI / 60,
        vision: 80,
      },
      pred: {
        fillStyle: '#f44141',
        radius: 6,
        speed: 3.8,
        radialSpeed: Math.PI / 60,
        vision: 90,
      },
    };
    this.preds = null;
    this.activePred = false;

    this.padding = 8;
  }

  setContext = ctx => (this.ctx = ctx);

  animate = () => this.step();

  createBoids = function(nB) {
    this.numBoids = nB;
    var i;
    for (i = 0; i < (nB || 1); i++) {
      this.boids.push(
        new Boid(this, Math.random() < 0.5 ? 'salmon' : 'yellow')
      );
    }
    this.pred = new Boid(this, 'pred');
  };

  adjustSize = function() {
    var nB = this.numBoids,
      l = this.boids.length,
      even = Math.abs(nB - l) % 2 === 0;
    if (nB < this.boids.length) {
      this.boids.pop();
      if (even) this.boids.pop();
    } else if (nB > this.boids.length) {
      this.boids.push(
        new Boid(this, Math.random() < 0.5 ? 'salmon' : 'yellow')
      );
      if (even)
        this.boids.push(
          new Boid(this, Math.random() < 0.6 ? 'salmon' : 'yellow')
        );
    }
  };

  clear = function() {
    this.boids = [];
  };

  update = function() {
    for (var i = 0; i < this.boids.length; i++) {
      if (this.boids[i].type === 'salmon')
        this.boids[i].update(this.config.salmon);
      else this.boids[i].update(this.config.yellow);
    }
  };

  updatePred = function() {
    this.pred.update(this.config.pred);
  };

  get width() {
    return this.ctx.canvas.width;
  }

  get height() {
    return this.ctx.canvas.height;
  }

  step = function() {
    var ctx = this.ctx;

    var displayWidth = ctx.canvas.parentNode.clientWidth;
    var displayHeight = ctx.canvas.parentNode.clientHeight;

    if (ctx.canvas.width !== displayWidth) ctx.canvas.width = displayWidth;

    if (ctx.canvas.height !== displayHeight) ctx.canvas.height = displayHeight;

    this.adjustSize();

    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, this.width, this.height);

    for (var i = 0; i < this.boids.length; i++) {
      this.boids[i].step(this);
      this.boids[i].draw(ctx);
    }
    if (this.activePred) {
      this.pred.step(this);
      this.pred.draw(ctx);
    }
  };
}

export default Swarm;
