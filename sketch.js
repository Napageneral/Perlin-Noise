var inc = 0.1;
var scl=10;
var cols,rows;
var fr;
var gravity;

var zOff=0;

let particles=[];
let flowfield;


function setup() {
	createCanvas(1200,800);
	gravity=createVector(0,1);
	cols = floor(width/scl);
	rows = floor(height/scl);
	fr = createP('');

	flowfield=new Array(cols*rows);

	for (var i = 0; i < 500; i++) {
		p=new Particle();
		particles.push(p);
	}
}

function draw() {
	background(255);
	var yOff=0;
	for (var y = 0; y < rows; y++) {
		var xOff=0;
		for (var x = 0; x < cols; x++) {
			var index = x+y*cols;
			flowfield[index]=v;
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
