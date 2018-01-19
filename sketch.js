//determines the rate at which the flowfield changes
var inc = 0.1;
//size of the individual flowfield boxes
var scl=10;
//initialize window division variables
var cols,rows;
//initialize frame rate tracking variable
var fr;
//initialize gravity variable
var gravity;
//initialize offset for the flowfield noise
var zOff=0;
//initialize the particle array
let particles=[];
//initialize the flowfield
let flowfield;


function setup() {
	createCanvas(1200,800);
	gravity=createVector(0,1);
	//divide the window into cols and rows based on the scale
	cols = floor(width/scl);
	rows = floor(height/scl);
	//create html object to track the framerate in
	fr = createP('');
	//initialize the flowfield array
	flowfield=new Array(cols*rows);
	//initialze the particles
	for (var i = 0; i < 500; i++) {
		p=new Particle();
		particles.push(p);
	}
}

function draw() {
	background(255);
	var yOff=0;
	//iterate through every index of the flowfield
	for (var y = 0; y < rows; y++) {
		var xOff=0;
		for (var x = 0; x < cols; x++) {
			//flatten the 2D index for the flowfield array
			var index = x+y*cols;
			flowfield[index]=v;
			//generate Perlin noise
			var angle = noise(xOff,yOff,zOff)*TWO_PI*4;
			var v = p5.Vector.fromAngle(angle);
			
			xOff+= inc;

		}
		yOff+=inc;
		zOff+=inc*.005;
	}

	
	for (var i = 0; i < particles.length; i++) {
		particles[i].follow(flowfield);
		particles[i].applyForce(gravity);
		particles[i].update();
		particles[i].show();
		particles[i].edges();
	}


	fr.html(floor(frameRate()));
}
