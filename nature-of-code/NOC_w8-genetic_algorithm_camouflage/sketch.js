// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function,
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//
//   # Rinse and repeat


let target;
let popmax;
let mutationRate;
let populations = [];

let bestPhrase;
let allPhrases;
let stats;
let answer;
let x = true;

function setup() {
  createCanvas(200,200);
  background(255,0,255,200);
  
  bestPhrase = createP("Best phrase:");
  //bestPhrase.position(10,10);
  bestPhrase.class("best");

  allPhrases = createP("All phrases:");
  allPhrases.position(600, 10);
  allPhrases.class("all");

  stats = createP("Stats");
  //stats.position(10,200);
  stats.class("stats");

  //createCanvas(640, 360);
  target = "255,000,255";
  popmax = 50;
  mutationRate = 0.01;
  
  // console.log(target);
  // Create a population with a target phrase, mutation rate, and population max
  for(let i=0; i<2; i++){
  populations[i] = new Population(target, mutationRate, popmax);
  }
  // frameRate(2);
}

function draw() {
  // background(255,0,255,200);
  for(let i=0; i<2; i++){
  // Generate mating pool
  populations[i].naturalSelection();
  //Create next generation
  populations[i].generate();
  // Calculate fitness
  populations[i].calcFitness();

  populations[i].evaluate();

  // If we found the target phrase, stop
  if (populations[i].isFinished()) {
    //println(millis()/1000.0);
    // noLoop();
  }

  displayInfo(populations[i], i);
  }
}

function displayInfo(pop, i) {
  // Display current status of population
  answer = pop.getBest();
  // bestPhrase.html("Best color:<br>" + answer);

  // let statstext = "total generations:     " + population.getGenerations() + "<br>";
  // statstext += "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
  // statstext += "total population:      " + popmax + "<br>";
  // statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";

  // stats.html(statstext);

  // allPhrases.html("All colors:<br>" + population.allPhrases())
  
  c11 = answer.charAt(0);
  c12 = answer.charAt(1);
  c13 = answer.charAt(2);
  c21 = answer.charAt(4);
  c22 = answer.charAt(5);
  c23 = answer.charAt(6);
  c31 = answer.charAt(8);
  c32 = answer.charAt(9);
  c33 = answer.charAt(10);
  
  // console.log(x,y,z);
  let r = int(c11+c12+c13);
  let g = int(c21+c22+c23);
  let b = int(c31+c32+c33);
  // console.log(r,g,b);
  fill(r,g,b);
  noStroke();
  
  ellipse((i+1)*width/3, (i+1)*height/3, 20,20);
}

function mousePressed(){
  x=!x;
  if(!x){
  background(147,180,130);
  target = "147,180,130";
  } else {
  background(255,000,255);
  target = "255,000,255";
  }
  // displayInfo();
}