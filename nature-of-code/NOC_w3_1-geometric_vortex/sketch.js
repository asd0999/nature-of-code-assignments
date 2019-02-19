
let off=0;
// let ioff;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(400,400);
  background(50);
}

function draw() {
  background(40);
  translate(width/2,height/2);
  for(var i=0; i<67; i++){
 		beginShape();
    stroke(50/tan(frameCount/(i/0.5)));
    strokeWeight(2);
    noFill();
    for(var a=0; a<=TWO_PI; a+=0.2){
    	let r = 20*(i+1)*noise(a,off);
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x,y);
    }
    endShape(CLOSE);
  }
  off += 0.002;
  // ioff = map(sin(off*10),-1,1,1,10);
}