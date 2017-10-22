// Set up canvas
const canvas = document.getElementById('boids');
const c = canvas.getContext('2d');

// Set Size
var size = {
  width: window.innerWidth || document.body.clientWidth,
  height: window.innerHeight || document.body.clientHeight
}
canvas.width = size.width;
canvas.height = size.height;

// Boid Attributes
var colors = [
  '#4286f4',
  '#42ebf4',
  '#41f4a0',
  '#8ff441',
  '#f4e841',
  '#f48341',
  '#f44141',
  '#a341f4',
  '#f9f9f9',
  '#f4416a'
];
var theEnd = false;
var numBoids = 50;
var radius = 4;
var quickness = .3;
// var maxSpeed = canvasWidth / 50;

// Mouse
var mouse = {
   x: innerWidth / 2,
   y: innerHeight / 2
};

// Event Listeners
addEventListener('mousemove', function(event){
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener('resize', function(){
  size.width = innerWidth;
  size.height = innerHeight;
  canvas.width = innerWidth;
	canvas.height = innerHeight;
	// init();
});

// Create Boids Array
var boids = [];

// Initialize Boids
function init() {

  var xNumbers = [];
  while(xNumbers.length < numBoids){
    var randomnumber = Math.ceil(Math.random()* ( size.width - ( radius * 2 ) ) ) + ( radius );
    if(xNumbers.indexOf(randomnumber) > -1) continue;
    xNumbers[xNumbers.length] = randomnumber;
  }

  var yNumbers = [];
  while(yNumbers.length < numBoids){
    var randomnumber = Math.ceil(Math.random()* ( size.height - ( radius * 2 ) ) ) + ( radius );
    if(yNumbers.indexOf(randomnumber) > -1) continue;
    yNumbers[yNumbers.length] = randomnumber;
  }

  // Instantiate all Boids
  for ( i = 0; i < numBoids; i++ ) {
    boids.push( new Boid( {
      id: i,
      x: xNumbers[i],
      y: yNumbers[i],
      containerWidth: size.width,
      containerHeight: size.height,
      quickness: quickness,
      radius: radius,
      color: randomColor(colors),
      cohesion: .5,
      aversion: .5,
      agility: getRandomInt(20,80) / 100,
      quickness: getRandomInt(20,80) / 100
    } ) );
  }

}








function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDistance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt( Math.pow(xDist, 2) + Math.pow(yDist, 2) );
}

function randomColor(colors) {
  return colors[ Math.floor( Math.random() * colors.length) ];
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);

  // UPdate all boids
  for (var i = 0; i < boids.length; i++ ) {
    boids[i].update();
  }

}

init();
animate();
