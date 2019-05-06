// Daniel Shiffman
// Nature of Code
// https://github.com/nature-of-code/noc-syllabus-S19

// This flappy bird implementation is adapted from:
// https://youtu.be/cXgA1d_E-jY&

// How big is the population
let totalPopulation = 100;
// All active birds (not yet collided with pipe)
let activeBirds = [];
// All birds for any given population
let allBirds = [];
// Pipes
let pipes = [];
// A frame counter to determine when to add a pipe
let counter = 0;
let loopBool = true;
let genCount = 1;
let fc_start = 0;
// let fc_stop = 0;
// let fc_diff = 0;
let y_increment = 530;

// var nn = require("./nn.js");

// Interface elements
let speedSlider;
let speedSpan;
let highScoreSpan;
let allTimeHighScoreSpan;
let hiddenSlider;
let hiddenSpan;
let mutationSlider;
let mutationSpan;
let initButton;
let allowSaveToDb;

// All time high score
let highScore = 0;

// Training or just showing the current best
let runBest = false;
let runBestButton;
let saveButton;

function setup() {
  // createCanvas(640, 480);
  createCanvas(640 * 2 + 140, 480 * 3); //1280+140 = (1420, 720)
  background(240);
  tf.setBackend('cpu');
  // canvas.parent('canvascontainer');

  allowSaveToDb = false;


  // Access the interface elements
  speedSlider = select('#speedSlider');
  speedSpan = select('#speed');
  highScoreSpan = select('#hs');
  allTimeHighScoreSpan = select('#ahs');
  runBestButton = select('#best');
  runBestButton.mousePressed(toggleState);
  hiddenSlider = select('#hiddenSlider');
  hiddenSpan = select('#hidden');
  mutationSlider = select('#mutationSlider');
  mutationSpan = select('#mutation');
  saveButton = select('#save');
  saveButton.mousePressed(saveModel);
  initButton = select('#init');
  initButton.mousePressed(initialise);

  // Create a population
  initialise();
}

function initialise() {
  // noLoop();
  console.log('initialised!');
  background(240);
  activeBirds = [];
  allBirds = [];
  // console.log(hiddenSlider.value());
  for (let i = 0; i < totalPopulation; i++) {
    let bird = new Bird();
    activeBirds[i] = bird;
    allBirds[i] = bird;
  }
  genCount = 1;
  highScore = 0;
  fc_start = frameCount;
  y_increment = 530;
  allowSaveToDb = true;
}

function saveModel() {
  bestBird.save();
}

function genGap() {
  stroke(255, 0, 0);
  line(((frameCount - fc_start) / 3) % 1420, y_increment - 27, ((frameCount - fc_start) / 3) % 1420, 690 - 530 + y_increment);
  genCount += 1;
}

// Toggle the state of the simulation
function toggleState() {
  runBest = !runBest;
  // Show the best bird
  if (runBest) {
    resetGame();
    runBestButton.html('continue training');
    // fc_start = frameCount;
    // Go train some more
  } else {
    nextGeneration();
    runBestButton.html('run best');
    // fc_stop = frameCount;
  }
}

function draw() {
  fill(50);
  rect(0, 0, 640 + 80, 480); //main flappy bird window
  // fill(240);
  // rect(640 + 80, 0, 1420, 480);

  // Should we speed up cycles per frame
  let cycles = speedSlider.value();

  // How many times to advance the game
  for (let n = 0; n < cycles; n++) {
    // Show all the pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
    // Are we just running the best bird
    if (runBest) {
      bestBird.think(pipes);
      bestBird.update();
      bestBird.abstract(true);
      for (let j = 0; j < pipes.length; j++) {
        // Start over, bird hit pipe
        if (pipes[j].hits(bestBird)) {
          resetGame();
          break;
        }
      }

      if (bestBird.bottomTop()) {
        resetGame();
      }
      // Or are we running all the active birds
    } else {
      for (let i = activeBirds.length - 1; i >= 0; i--) {
        let bird = activeBirds[i];
        // Bird uses its brain!
        bird.think(pipes);
        bird.update();
        bird.abstract(false);
        // Check all the pipes
        for (let j = 0; j < pipes.length; j++) {
          // It's hit a pipe
          if (pipes[j].hits(activeBirds[i])) {
            // Remove this bird
            activeBirds.splice(i, 1);
            break;
          }
        }

        if (bird.bottomTop()) {
          activeBirds.splice(i, 1);
        }
      }
    }

    // Add a new pipe every so often
    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
  }

  // What is highest score of the current population
  let tempHighScore = 0;
  // If we're training
  if (!runBest) {
    // Which is the best bird?
    let tempBestBird = null;
    for (let i = 0; i < activeBirds.length; i++) {
      let s = activeBirds[i].score;
      if (s > tempHighScore) {
        tempHighScore = s;
        tempBestBird = activeBirds[i];
      }
    }

    // Is it the all time high scorer?
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
      bestBird = tempBestBird;
    }
  } else {
    // Just one bird, the best one so far
    tempHighScore = bestBird.score;
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
    }
  }

  // Update DOM Elements
  speedSpan.html("speed: " + cycles + " >>");
  highScoreSpan.html("score: " + tempHighScore);
  allTimeHighScoreSpan.html("high score: " + highScore);
  hiddenSpan.html("nodes: " + hiddenSlider.value() + " >>");
  mutationSpan.html("mutation rate: " + mutationSlider.value() + "% >>");

  if (highScore > 10000 && allowSaveToDb == true) {
    postData(`/log`, {
        nodes: HIDDEN, //HIDDEN from nn
        mutation: _mutation, //mutation*100 from nn
        generation: genCount //genCount from here
      })
      .then(() => {
        textSize(22);
        fill(50);
        text("Game learnt! Change settings and test again", 880, 200);
      })
      // .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
      .catch(error => console.error(error));


    allowSaveToDb = false;
    console.log('posted!');
  }

  if (((frameCount - fc_start) / 3) % 1420 == 0) {
    // push();
    // fill(240);
    // rect(0, 480, 1420, 480);
    // pop();
    y_increment += 200;
    console.log(y_increment);
  }

  // Draw everything!
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].show();
    // if (!runBest) {
    // pipes[i].showShifted();
    // }
  }

  if (runBest) {
    bestBird.show();
  } else {
    for (let i = 0; i < activeBirds.length; i++) {
      activeBirds[i].show();
      // if (i == 0) {
      //   let bird = activeBirds[i];
      //   if (pipes[0] != null && pipes[0].x >= bird.x) {
      //     stroke(0, 0, 255);
      //     fill(0, 0, 255);
      //     // ellipse(bird.x + 640 + 80, bird.inputs[0] * 480, 10, 10);
      //     // ellipse(pipes[0].x + 640 + 80, bird.inputs[1] * 480, 10, 10);
      //     // ellipse(pipes[0].x + 640 + 80, bird.inputs[1] * 480 + 125, 10, 10);
      //     strokeWeight(1);
      //     line(bird.x + 640 + 80, bird.y, pipes[0].x + 640 + 80, bird.inputs[1] * 480);
      //     line(bird.x + 640 + 80, bird.y, pipes[0].x + 640 + 80, bird.inputs[1] * 480 + 125);
      //   }
      //   // if (!runBest) {
      //   // bird.showShifted();
      //   // }
      //   if (!loopBool) {
      //     if (bird.inputs[4] < 0) {
      //       triangle(bird.x + 640 + 80, bird.y - 40, bird.x + 640 + 70, bird.y - 30, bird.x + 640 + 90, bird.y - 30);
      //     } else if (bird.inputs[4] > 0 && bird.y < 450) {
      //       triangle(bird.x + 640 + 80, bird.y + 40, bird.x + 640 + 70, bird.y + 30, bird.x + 640 + 90, bird.y + 30);
      //     }
      //   }
      // }
    }
    // If we're out of birds go to the next generation
    if (activeBirds.length == 0) {
      nextGeneration();
    }
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

  if (key == 's') {
    initialise();
  }
}

function postData(url, data) {
  console.log(url, data);
  // $.post("/log", data, function(data, status) {
  //   return data
  // });
  return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => {
      // let data = response.clone().json();
      // console.log(data);
      return response.json();
      console.log(response.json()[0]);
      // fill(240);
      // rect(640 + 80, 0, 1420, 480);
      textSize(32);
      text("heyyy", 800, 200);
      // let data = response.json();
      // text(data[PromiseValue][0], 800, 250);
      // var array = [];
      // array = response.JSON
      // let specificObject = array.filter(object => {
      //   return object.id = 23;
      // })
      // }  ); // parses JSON response into native Javascript objects

    }).then((jsonData) => {
      // console.log(jsonData);
      console.log(jsonData[0]);
      // textSize(32);
      // text(jsonData[0].id, 800, 200);

      jsonData.forEach(element => {
        let pltX = map(element.nodes, 4, 8, 720, 1420);
        let pltY = map(element.generation, 1, 100, 480, 0);
        // text(element.id, 800, 200);
        ellipse(pltX, pltY, 20, 20);
      });


    });
}
// function getData(url) {
//   $.get("/", function(data) {
//     console.log(data);
//   });
// }