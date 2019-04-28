// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird

class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.8;
    this.lift = -12;
    this.velocity = 0;


    this.score = 0;
    this.fitness = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }

  }

  show() {
    // stroke(255);
    noStroke();
    fill(255, 100);
    ellipse(this.x, this.y, 32, 32);
  }

  // abstract() {
  //   stroke(255);
  //   fill(255, 100);
  //   ellipse(this.x + 640, this.y, 12, 12);
  // }

  up() {
    this.velocity += this.lift;
  }

  mutate() {
    this.brain.mutate(0.05); //changex 0.1
  }

  think(pipes) {

    // Find the closest pipe
    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = (pipes[i].x + pipes[i].w) - this.x;
      if (d < closestD && d > 0) {
        closest = pipes[i];
        closestD = d;
      }
    }


    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;
    inputs[4] = this.velocity / 10;
    let output = this.brain.predict(inputs);
    // this.abstract(inputs[0], inputs[1], inputs[2], inputs[3]);
    //if (output[0] > output[1] && this.velocity >= 0) {
    if (output[0] > output[1]) {
      this.up();
    }

  }

  abstract() {
    noStroke();
    fill(random(160));
    ellipse(width / 2 + 80 + frameCount / 3, height / 2 + this.y / 3, 0.5, 0.5);
    // ellipse(1000, closest.top, 12, 12);
    // ellipse(1000, closest.bottom, 12, 12);
    // ellipse(closest.x, closest.top, 12, 12);
  }

  offScreen() {
    return (this.y > height || this.y < 0);
  }

  update() {
    this.score++;

    this.velocity += this.gravity;
    //this.velocity *= 0.9;
    this.y += this.velocity;
  }

}