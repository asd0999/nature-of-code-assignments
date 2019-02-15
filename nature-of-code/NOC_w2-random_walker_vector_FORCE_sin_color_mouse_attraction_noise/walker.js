class Walker {
  constructor(){
  	this.position = createVector(width/2, height/2);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.topspeed = 5;
    this.prev = createVector(width/2, height/2);
    this.t = random(10);
    this.c = random(10,20);
  }
  
  applyForce(force) {
    this.acceleration.add(force); 
  }
  
  update(){
		this.velocity.add(this.acceleration);
    // if(random(1)>0.2){
    	this.velocity.limit(this.topspeed);
  	// }
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  display(){
    // stroke(255);
    let thick = map(noise(this.t),0,1,1,10);
    strokeWeight(thick);
    let sinner = sin(frameCount/this.c);
    let col = map(sinner, -1, 1, 205, 0);
    stroke(col);
    point(this.position.x, this.position.y);
    this.t += 0.01;
  }
  
}
