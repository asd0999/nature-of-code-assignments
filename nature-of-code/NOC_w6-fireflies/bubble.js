class Bubble {
	constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.d=7;
    this.r = this.d/2;
    this.col=0;
    this.topspeed = 0.5;
    this.glowState = false;
    // this.inc = 0;
    // this.angle += this.inc;
  }
   
  applyForce(force) {
    this.acc.add(force); 
  }

  
  update(){
  	this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.limit(this.topspeed);
  }
  
  display(){
		noStroke();    
    strokeWeight(1);
    fill(this.col,150);
    ellipse(this.pos.x, this.pos.y, this.d, this.d);
    // ellipse(this.pos.x, this.pos.y, this.d*2, this.d/3);
    // push();
    // translate(this.pos.x, this.pos.y);
    // rotate(PI/4);
    // ellipse(0, 0, this.d*2, this.d/3);
    // rotate(PI/2);
    // rect(0, -0.5, this.d*1.5, this.d/6);
    // pop();
  }
  
  borders() {
    if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y < -this.r) this.pos.y = height + this.r;
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;
  }

  near(other){
    let d = dist(this.pos.x,this.pos.y,other.pos.x,other.pos.y)
    let c = (this.d*7.5); //4
    return(d<=c);
  }
  
  checkNeighbour(other){
  	if(other.col == 255){
  		// this.glow();
  	// } else {
  	// this.default();
      return true;
  	}
  }
    
  glow(){
    if(this.glowState==false){
      this.col = 255;
      this.glowState = true;
      setTimeout(()=>{this.default()},100);
    }
  }  
  
  default(){
  	this.col = 0;
    setTimeout(()=>{this.glowState = false},1000); 
  }
  
}
