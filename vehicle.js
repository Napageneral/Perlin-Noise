//takes a linear distribution (random(0,1)) and makes it exponential to weight for more smaller sizes
function getRandomSize(){
  let r = pow(random(0,1),2);
  return constrain(r*32,4,32);
}



class Snowflake {
  
  constructor(sx,sy,img){
    //initializes the vehicle at a specified position or somewhere randomly above the screen.
    let x = sx||random(width);
    let y = sy||random(-100,-10);
    
    //passes the given image
    this.img=img;

    //initializes the vehicle at its given position
    this.pos=createVector(x,y);
    this.vel=createVector(0,0);
    this.acc=createVector();

    //initializes the vehicle with a random size weighted towards smaller sizes
    this.r= getRandomSize();
    //gives the vehicle a starting angle for it to rotate from
    this.angle=random(TWO_PI);
    //gives the vehicle a random direction to rotate in, 50/50 clockwise or counterclockwise
    this.dir=random((1) > 0.5)? 1:-1;
    //initiallizes the offset to implement sin wave falling
    this.xOff=0;
  }

  //Nulls the vehicle's physics and sets it randomly above the screen with a new size
  randomize(){
    let x =random(width);
    let y = random(-100,-10);
    this.pos=createVector(x,y);
    this.vel=createVector(0,0);
    this.acc=createVector();
    this.r= getRandomSize();
  }

  
  render(){
    push();
    //implements sin wave falling
    translate(this.pos.x+this.xOff,this.pos.y);
    //rotates the vehicle
    rotate(this.angle);
    imageMode(CENTER);
    //draws the image
    image(this.img,0,0,this.r,this.r);
    pop();

  }

  applyForce(force){
    //Parallax Effect
    let f = force.copy();
    //causes forces to effect larger vehicles more strongly
    f.mult(this.r);
    this.acc.add(f);
  }

  offScreen(){
    return (this.pos.y>height+this.r);
  }

  update(){
    //velocity impacted by the size of the vehicle
    this.vel.add(this.acc);
    this.vel.limit(this.r*.4);
    //limits the floor velocity, honestly not sure what normalize() does
    if (this.vel.mag() <1){
      this.vel.normalize();
    }
    //basic physics
    this.pos.add(this.vel);
    this.acc.mult(0);
    //resets vehicles that have fallen below the screen back to the top
    if (this.offScreen()) {
      this.randomize();
    }
    //edge detection that causes vehicles to wrap around the width of the screen
    if (this.pos.x < -this.r) {
      this.pos.x=width+this.r;
    }
    if (this.pos.x > width+this.r) {
      this.pos.x=-this.r;
    }
    //rotates image
    this.angle+=this.dir*this.vel.mag()/200;
    //sin wave falling
    this.xOff=sin(this.angle*2)*2*this.r;
  }
}
