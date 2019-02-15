let walker = [];
let num =10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(400,400);
  background(250);
  for(var i=0; i<num; i++){
  	walker[i] = new Walker();
  }
}

function draw() {
  // background(20);
	
  for(var i=0; i<num; i++){
  let force = p5.Vector.random2D();
  force.mult(10);
  walker[i].applyForce(force);

  var mouse = createVector(mouseX, mouseY);
  mouse.sub(walker[i].position);
  mouse.setMag(5);
  walker[i].applyForce(mouse);
  walker[i].display();
  walker[i].update();
  }
}