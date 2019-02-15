var pos;
var prev;
var count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(400,400);
  background(240);
  pos = createVector(200, 200);
  prev = pos.copy();
}

function draw() {
  // background(220);
  if(frameCount<4000){
  var sinner = sin(frameCount*0.5);
  var col = map(sinner, -1, 1, 0, 255);
  for (var i = 0; i < 50; i++) {
    stroke(0);
    strokeWeight(random(0,4));
		
    var step = p5.Vector.random2D();
    var r = random(100);
		var f = random(100);
    
    var mouse = createVector(mouseX, mouseY);
    mouse.sub(pos);
    mouse.setMag(0.2);
		
    if (r > 99) {
      step.mult(floor(random(30, 50)));
    } else {
      step.mult(floor(random(1, 5)));
    }
    
    if (f>70) {
    	pos.add(mouse);
    } else {
    	pos.add(step);
    }
    stroke(col);
    pos.x = constrain(pos.x, 0, width);
    pos.y = constrain(pos.y, 0, height);
    line(pos.x, pos.y, prev.x, prev.y);
    prev.set(pos);
  }
  console.log(col);
  } else {
    noLoop();
    console.log("stopped!");
  }
}