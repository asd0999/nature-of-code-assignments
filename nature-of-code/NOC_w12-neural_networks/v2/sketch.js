// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird

// Part 1: https://youtu.be/c6y21FkaUqw
// Part 2: https://youtu.be/tRA6tqgJBc
// Part 3: https://youtu.be/3lvj9jvERvs
// Part 4: https://youtu.be/HrvNpbnjEG8
// Part 5: https://youtu.be/U9wiMM3BqLU

const TOTAL = 100;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let slider;
let genCount = 1;
loopBool = true;

function keyPressed() {
  if (key === 'S') {
    let bird = birds[0];
    saveJSON(bird.brain, 'bird.json');
  }
}

function setup() {
  createCanvas(640 * 2 + 140, 480 * 1.5); //1280+140 = (1420, 720)
  background(240);
  // slider = createSlider(0.01, 1, 0.1);
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
}

function genGap() {
  stroke(255, 0, 0);
  line((frameCount / 3) % 1420, 500, (frameCount / 3) % 1420, 670);
  genCount += 1;
}

function draw() {
  for (let n = 0; n < 1; n++) {
    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    for (let i = birds.length - 1; i >= 0; i--) {
      if (birds[i].offScreen()) {
        savedBirds.push(birds.splice(i, 1)[0]);
      }
    }

    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
    }

    if (birds.length === 0) {
      counter = 0;
      nextGeneration();
      pipes = [];
    }
  }

  // All the drawing stuff
  fill(50);
  rect(0, 0, 640 + 80, 480);
  fill(240);
  rect(640 + 80, 0, 1420, 480);

  for (let bird of birds) {
    bird.show();
    bird.abstract();
    if (bird == birds[0]) {
      if (pipes[0] != null && pipes[0].x > bird.x) {
        stroke(0, 0, 255);
        // ellipse(bird.x + 640 + 80, bird.inputs[0] * 480, 10, 10);
        // ellipse(pipes[0].x + 640 + 80, bird.inputs[1] * 480, 10, 10);
        // ellipse(pipes[0].x + 640 + 80, bird.inputs[1] * 480 + 125, 10, 10);
        strokeWeight(0.5);
        line(bird.x + 640 + 80, bird.y, pipes[0].x + 640 + 80, bird.inputs[1] * 480);
        line(bird.x + 640 + 80, bird.y, pipes[0].x + 640 + 80, bird.inputs[1] * 480 + 125);
      }
      bird.showShifted();
      if (!loopBool) {
        if (bird.inputs[4] < 0) {
          // if (bird.up) {
          // console.log('up');
          triangle(bird.x + 640 + 80, bird.y - 40, bird.x + 640 + 70, bird.y - 30, bird.x + 640 + 90, bird.y - 30);
          // } else if (!bird.up && bird.y < 400) {
        } else if (bird.inputs[4] > 0 && bird.y < 400) {
          // console.log('down');
          triangle(bird.x + 640 + 80, bird.y + 40, bird.x + 640 + 70, bird.y + 30, bird.x + 640 + 90, bird.y + 30);
        }
      }
    }
  }

  for (let pipe of pipes) {
    pipe.show();
    pipe.showShifted();
  }

  fill(255);
  rect(5, 485, 100, 20);
  fill(50);
  textSize(15);
  text("Generation " + genCount, 5, 500);

  push();
  stroke(255, 0, 0);
  strokeWeight(3);
  line(640 + 80, 0, 640 + 80, 480);
  pop();

}

function keyPressed() {
  if (key == ' ') {
    if (loopBool) {
      noLoop();
      loopBool = false;
    } else {
      loop();
      loopBool = true;
    }
  }
}