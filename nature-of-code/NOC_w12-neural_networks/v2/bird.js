// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird

class Bird {
  constructor(brain) {
    this.y = 480 / 2;
    this.x = 64;

    this.gravity = 0.8;
    this.lift = -12;
    this.velocity = 0;
    this.inputs = [];
    // this.up = true;

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

  showShifted() {
    noStroke();
    fill(155);
    ellipse(this.x + 640 + 80, this.y, 32, 32);
  }

  up() {
    this.velocity += this.lift;
    // this.up = true;
  }

  mutate() {
    this.brain.mutate(0.1); //changex 0.1
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

    // let inputs = [];
    this.inputs[0] = this.y / 480;
    this.inputs[1] = closest.top / 480;
    this.inputs[2] = closest.bottom / 480;
    this.inputs[3] = closest.x / width;
    this.inputs[4] = this.velocity / 10;
    let output = this.brain.predict(this.inputs);
    //if (output[0] > output[1] && this.velocity >= 0) {
    if (output[0] > output[1]) {
      this.up();
    }
    // this.up = false;
  }

  abstract() {
    noStroke();
    fill(random(100));
    if ((frameCount / 3) % 1420 == 0) {
      push();
      fill(240);
      rect(0, 480, 1420, 480);
      pop();
    }
    ellipse((frameCount / 3) % 1420, 520 + this.y / 3, 0.5, 0.5);

  }

  offScreen() {
    return (this.y > 450 || this.y < 0);
  }

  update() {
    this.score++;

    this.velocity += this.gravity;
    //this.velocity *= 0.9;
    this.y += this.velocity;
  }

}