let bubbles = [];
let num = 50;

function setup() {
  // createCanvas(windowWidth,windowHeight);
  createCanvas(600, 400);
  for(let i=0; i<num; i++){
    let x = random(width);
    let y = random(height);
  	bubbles[i] = new Bubble(x,y);
  }
}

function draw() {
  background(120);
  for(let i=num-1; i>=0; i--){
    // var mouse = createVector(mouseX, mouseY);
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].checkEdges();
    
    let force = p5.Vector.random2D();
    force.mult(2);
    bubbles[i].applyForce(force);

    let overlapping = false;
    for(let j=num-1; j>=0; j--){
      bubbles[i].makeConnection(bubbles[j]);
      if (i != j && bubbles[i].intersects(bubbles[j])){
      	overlapping = true;
      }
      if(overlapping){
      	bubbles[i].changeColor(255);
        bubbles[i].excite(0.1);
  		} else {
      	bubbles[i].changeColor(15);
        bubbles[i].excite(3);
    	}
    }
  }
}