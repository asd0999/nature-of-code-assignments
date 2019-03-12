let bubbles = [];
let num = 500; //460
let angle = 0;

function preload(){
	wings = loadSound('wings.wav');
  // buzz = loadSound('buzz-small.wav');
  cicada = loadSound('cicada_small.wav');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  // createCanvas(600, 400);
  cicada.loop();
  for (let i = 0; i < num; i++) {
    let x = random(width);
    let y = random(height);
    bubbles[i] = new Bubble(x, y);
  }
  // wings.rate(-0.2);
}

function draw() {
  // background(20, 120, 120, 120);
  background(18,100);
  // let color = map(sin(angle), -1, 1, 15, 0);
  let t = floor(random(num*40));
  if(t<num){
    // if (color < 14) {
    //   bubbles[t].col = 0;
    // } else {
      bubbles[t].col = 255;
    	wings.play();
    	// buzz.play();
    }
  // }
  for (let i = num - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].borders();

    let force = p5.Vector.random2D();
    force.mult(0.02);
    bubbles[i].applyForce(force);

    if(bubbles[i].glowState==false){
      for (let j = num - 1; j >= 0; j--) {
        if (i != j && bubbles[i].near(bubbles[j])) {
          // nearness = true;
          // bubbles[i].checkNeighbour(bubbles[j]);
          if (bubbles[i].checkNeighbour(bubbles[j])) {
            bubbles[i].glow();
            break;
          }
        }
      }  
    }
  }
  angle += 0.08;
}