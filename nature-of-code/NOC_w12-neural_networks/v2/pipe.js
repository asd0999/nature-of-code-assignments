// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird

class Pipe {

  constructor() {
    this.spacing = 125;
    this.top = random(480 / 6, 3 / 4 * 480);
    this.bottom = 480 - (this.top + this.spacing);
    this.x = 640;
    this.w = 80;
    this.speed = 6;
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > 480 - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  show() {
    fill(255);
    rectMode(CORNER);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, 480 - this.bottom, this.w, this.bottom);
  }

  showShifted() {
    fill(50);
    rectMode(CORNER);
    rect(this.x + 640 + 80, 0, this.w, this.top);
    rect(this.x + 640 + 80, 480 - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}