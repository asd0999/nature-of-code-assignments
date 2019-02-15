class Walker {
  constructor(){
  	this.position = createVector(width/2, height/2);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.topspeed = 5;
  }
  
  update(){
  	var mouse = createVector(mouseX, mouseY);
    mouse.sub(position);
		this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
  }
  
  display(){
  	
  }
  
}
