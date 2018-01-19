function Particle(){
  //initialize the particle somewhere randomly on screen
  this.pos=createVector(random(width),random(height));
  this.vel=createVector(0,0);
  this.acc=createVector(0,0);
  this.maxspeed=4;


  this.update=function(){
    //basic physics model
    this.vel.add(this.acc);
    //limits the velocity to the maxspeed variable
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  
  //Causes the particle to be acted on by the perlin flow field
  this.follow=function(vectors){
    //find the closest matching index of the 2D perlin field to the particle's position
    var x = floor(this.pos.x/scl);
    var y = floor(this.pos.y/scl);
    //flatten the 2D index
    var index = x+y*cols;
    //get the force from the Perlin field
    var force = vectors[index];
    this.applyForce(force);
  }

  this.applyForce=function(force){
    this.acc.add(force);
  }
  
  //renders the particle
  this.show= function(){
    push();
    strokeWeight(4);
    stroke(0);
    point(this.pos.x,this.pos.y);
    pop();
  }

  //edge detection for the particle that causes it to wrap around to the other side of the screen
  this.edges=function(){
    if (this.pos.x>width) {
      this.pos.x=0;
    }
    if (this.pos.x<0) {
      this.pos.x=width;
    }
    if (this.pos.y>height) {
      this.pos.y=0;
    }
    if (this.pos.y<0) {
      this.pos.y=height;
    }
  }
}
