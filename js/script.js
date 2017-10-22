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
    var quickness = .5;
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

        if ( boids[i].distanceFromHorWall() < 1 || boids[i].distanceFromVertWall() < 1  ) {
          boids[i].changeDirection();
        }
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


})();
