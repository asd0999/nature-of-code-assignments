let off = 0;
let px, py;
let star = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(400,400);
  background(40);
  for(var i=0; i<200; i++){
  	star.push(random(width));
    star.push(random(height));
  }
}

function draw() {
  background(40);
  for(var i=0; i<200; i+=1){
    stroke(255);
    strokeWeight(star[i]%3);	
    point(star[i],star[i+1]);
  }
  translate(width / 2, height / 2);
  for (var a = 0; a <= 360; a += 10) {
    let x = 150 * cos(a+off);
    let y = 200 * sin(a-off);
    let z = 300 * sin(off);
    let q = 50 * sin(off);
    let w = map(sin(a), -1, 1, 1, 5);
    stroke(tan(frameCount/cos(a*100)), 255-(w*10));
    strokeWeight(5.1-w);
    noFill();
    line(x, y, x-z, y-q);
  }
off += 0.002;
}