(function() {

  if ( TweenMax ) {

    // Set Size
    var size = {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight
    }
    var canvasWidth = size.width;
    var canvasHeight = size.height;
    var canvas = document.getElementById('boids');

    // Setup Canvas
    var theEnd = false;
    var numBoids = 20;
    var radius = 3;
    var quickness = .3;
    // var maxSpeed = canvasWidth / 50;

    var boids = [];

    var xNumbers = [];
    while(xNumbers.length < numBoids){
      var randomnumber = Math.ceil(Math.random()* ( canvasWidth - ( radius * 2 ) ) ) + ( radius );
      if(xNumbers.indexOf(randomnumber) > -1) continue;
      xNumbers[xNumbers.length] = randomnumber;
    }

    var yNumbers = [];
    while(yNumbers.length < numBoids){
      var randomnumber = Math.ceil(Math.random()* ( canvasHeight - ( radius * 2 ) ) ) + ( radius );
      if(yNumbers.indexOf(randomnumber) > -1) continue;
      yNumbers[yNumbers.length] = randomnumber;
    }

    // Instantiate all Boids
    for ( i = 0; i < numBoids; i++ ) {
      boids.push( new Boid( { id: i, x: xNumbers[i], y: yNumbers[i], containerWidth: canvasWidth, containerHeight: canvasHeight, quickness: quickness, radius: radius } ) );
    }

    // Run Interval Loop
    var runBoids = setInterval( loop, 16 );


  } else {
    // canvas-unsupported code here
    alert('JavaScript Canvas is not supported in your browser. Please update your browser or try another.');
  }


  // Loop Function
  function loop() {
    var timer = 0;
    if ( ! theEnd ) {
      timer++;
      // Loop through all boids
      for ( i = 0; i < boids.length; i++) {

        var nextPosition = boids[i].nextPosition();

        // Wall Check
        var distanceFromHorWall = boids[i].distanceFromHorWall();
        var distanceFromVertWall = boids[i].distanceFromVertWall();

        // Check for borders
        if ( distanceFromHorWall < 1 || distanceFromVertWall < 1  ) {
          boids[i].wallBounce();
        } else {


          boids[i].curve(getRandomInt(-10,10));
        }

        // Boid avoidance
        boids[i].avoidTheBoids();


        // console.log( boids[i].distanceFromHorWall() );
        // console.log( boids[i].distanceFromVertWall() );

      }
      if (timer > 500) theEnd = true;
    } else {

      clearInterval( runBoids );

    }

  }
  var loop = loop();

  // Render Boid
  function renderBoid( boid ) {

    // var newpath = new Path.Circle({
    //   center: [boid.x , boid.y],
    //   radius: radius,
    //   fillColor: '#a7f9b9'
    // });

  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  console.log(getRandomInt(-10,10));

})();
