class Bubble {
	constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.d=10;
    this.col=0;
    this.topspeed = 0;
  }
  
  applyForce(force) {
    this.acc.add(force); 
  }

  
  update(){
  	this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.limit(this.topspeed);
    this.pos.x = constrain(this.pos.x,0,width);
    this.pos.y = constrain(this.pos.y,0,width);
  }
  
  display(){
		noStroke();    
    strokeWeight(1);
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.d, this.d);
  }
  
  intersects(other){
    return(dist(this.pos.x,this.pos.y,other.pos.x,other.pos.y)<=(this.d/2+other.d/2));
  }
  
  changeColor(bright){
    this.col=bright; 
		if(bright==255){
			this.d=15;
		} else {
		this.d=12;
		}
  }
  
  makeConnection(other){
    if(dist(this.pos.x,this.pos.y,other.pos.x,other.pos.y)-(this.d*2)<=(this.d/2+other.d/2)){
      stroke(0,255,0,150);
      strokeWeight(1);
      line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      return true;
    } else{ 
      return false;
    }
  }
  
  excite(speed){
  	if(this.intersects){
    	this.topspeed = speed;
    } else if(!this.intersects){
    	this.topspeed = speed;
    }
  }
  
  checkEdges(){
  	if(this.pos.x>width || this.pos.x<0){
    	this.vel.mult(-1);
    }
    if(this.pos.y>height || this.pos.y<0){
    	this.vel.mult(-1);
    }
  }
}
