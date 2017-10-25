class Boid {

  constructor(boid) {

    // Initial Properties
    this.id = boid.id;
    this.location = new Victor( boid.x, boid.y );
    var radiusCoefficients = [.5,.6,.7,.8,1];
    this.radiusCoefficient = Math.floor(Math.random() * radiusCoefficients.length);
    this.radius = boid.radius * radiusCoefficients[ this.radiusCoefficient ];
    this.introversion = boid.introversion * this.getRandomInt(20,80) / 100;
    this.agility = boid.agility * this.getRandomInt(20,80) / 100;
    this.quickness = boid.quickness * this.getRandomInt(50,100) / 100;
    this.racism = boid.racism * this.getRandomInt(20,80) / 100;
    this.color = boid.color;
    this.mass = (4/3) * Math.PI * Math.pow( this.radius,3 );

    // Direction
    this.prevRadians = Math.PI * this.getRandomInt(-99,100) / 100;
    this.radians = this.prevRadians;

    // Speed & Velocity
    this.maxSpeed = 10 * this.quickness;
    this.prevSpeed = this.maxSpeed * .5;
    this.speed = this.prevSpeed;
    this.velocity = new Victor( this.speed * Math.cos( this.radians ), this.speed * Math.sin( this.radians ) );
    //Force and Accel
    this.maxForce = .5;
    this.acceleration = new Victor(0, 0);


  }

  // Arrival behavior to control boids arriving at their target
  seek( target ){
    var targetLocation = target.clone();
    var diff = targetLocation.subtract(this.location);
    var desired = new Victor(diff.x,diff.y);

    if (target.radius) {
      var buffer = target.radius + this.radius + 1;
    } else {
      var buffer = this.radius * 2 + 1;
    }

    var dist = diff.magnitude();
    if (dist < buffer) {
      desired.x = 0;
      desired.y = 0;
    } else if ( dist <= 100 ) {
      desired.normalize();
      desired.x = desired.x * this.maxSpeed * dist / 100;
      desired.y = desired.y * this.maxSpeed * dist / 100;
    } else {
      desired = this.limitVector( desired, this.maxSpeed);
    }
    return this.limitVector( desired.subtract(this.velocity), this.maxForce );
  }

  // Separation Force
  separate( boids ){
    var sum = new Victor();
    var count = 0;
    for (var j = 0; j < boids.length; j++) {
      if ( this.color != boids[j].color ) {
        var racismMultiplier = this.racism;
      } else {
        var racismMultiplier = 0;
      }
      var desiredSeparation = this.radius + boids[j].radius + ( 50 * this.introversion ) + ( 50 * racismMultiplier );
      var sep = this.location.clone().distance(boids[j].location);
      if ( (sep > 0) && (sep < desiredSeparation) ) {
        var thisLocation = this.location.clone();
        var diff = thisLocation.subtract(boids[j].location);
        diff.normalize();
        diff.x = diff.x / sep;
        diff.y = diff.y / sep;
        sum.add(diff);
        count++;
      }
    }
    if (count > 0) {
      sum.x = sum.x / count;
      sum.y = sum.y / count;
      sum.normalize();
      sum.x = sum.x * this.maxSpeed;
      sum.y = sum.y * this.maxSpeed;
      sum.subtract(this.velocity);
      sum = this.limitVector(sum,this.maxForce);
    }
    return sum;
  }

  align( boids ) {
    var neighborDist = 50;
    var sum = new Victor();
    var steer = new Victor();
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var dist = this.location.distance(boids[i].location);
      if ( dist > 0 && dist < neighborDist ) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.x = sum.x / count;
      sum.y = sum.y / count;
      sum.normalize()
      sum.x = sum.x * this.maxSpeed;
      sum.y = sum.y * this.maxSpeed;
      steer = this.limitVector(sum.subtract(this.velocity),this.maxForce);
      return steer;
    } else {
      return steer;
    }
  }

  cohesion( boids ) {
    var neighborDist = 50;
    var sum = new Victor();
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var dist = this.location.distance(boids[i].location);
      if ( dist > 0 && dist < neighborDist ) {
        sum.add(boids[i].location);
        count++;
      }
    }
    if (count > 0) {
      sum.x = sum.x / count;
      sum.y = sum.y / count;
      return this.seek(sum);
    } else {
      return sum;
    }
  }

  flock() {

    // Get Forces
    var alignForce = this.align(boids);
    if (mouseSeek) var mouseForce = this.seek(mouse.location);
    var separateForce = this.separate(boids);
    var cohesionForce = this.cohesion(boids);

    // Weight Forces
    var alignWeight = 1.5;
    var separateWeight = 1;
    var cohesionWeight = 1.4;
    if (mouseSeek) var mouseWeight = .2;

    // Apply forces
    this.applyForce( alignForce, alignWeight );
    if (mouseSeek) this.applyForce( mouseForce, mouseWeight );
    this.applyForce( separateForce, separateWeight );
    this.applyForce( cohesionForce, cohesionWeight );

  }

  // Apply a force based on a coefficient
  applyForce( force, coefficient ) {
    if ( ! coefficient ) { var coefficient = 1; }
    force.x = force.x * coefficient;
    force.y = force.y * coefficient;
    this.velocity.add(force);
    this.velocity = this.limitVector( this.velocity, this.maxSpeed );
  }

  nextPosition() {

    // Loop through behaviors to apply forces
    this.flock();
    // Update location
    this.location = this.location.add(this.velocity);

    this.detectCollision();

    this.wallBounce();

    // Update Angle
    this.radians = - this.velocity.angle();
    this.degrees = this.radians * 180/Math.PI;

  }

  movingRight() {
    if ( this.velocity.x > 0 ) {
      return true;
    } else {
      return false;
    }
  }

  movingDown() {
    if ( this.velocity.y > 0 ) {
      return true;
    } else {
      return false;
    }
  }

  // Limit a vector to a max magnitude
  limitVector( vector, max ) {
    if (vector.length() > max) {
      var newVector = vector.clone();
      newVector.normalize();
      newVector.x = newVector.x * max;
      newVector.y = newVector.y * max;
      return newVector;
    } else {
      return vector;
    }
  }

  // Detect a wall hit and bounce
  wallBounce() {

    if (walls) {
      if (this.location.x < this.radius) {
        this.location.x = this.radius;
      } else if ( this.location.x > document.body.clientWidth - this.radius) {
        this.location.x = document.body.clientWidth - this.radius;
      }
      if (this.location.y < this.radius) {
        this.location.y = this.radius;
      } else if ( this.location.y > document.body.clientHeight - this.radius ) {
        this.location.y = document.body.clientHeight - this.radius;
      }
      if ( this.distanceFromHorWall() <= this.radius  ) {
        this.velocity.invertY();
      }
      if ( this.distanceFromVertWall() <= this.radius  ) {
        this.velocity.invertX();
      }
    } else {
      if (this.location.x < 0) {
        this.location.x = document.body.clientWidth;
      } else if ( this.location.x > document.body.clientWidth ) {
        this.location.x = 0;
      }
      if (this.location.y < 0) {
        this.location.y = document.body.clientHeight;
      } else if ( this.location.y > document.body.clientHeight ) {
        this.location.y = 0;
      }
    }

  }

  distanceFromVertWall() {
    if (this.movingRight()) {
      return document.body.clientWidth - ( this.location.x );
    } else {
      return this.location.x;
    }

  }

  distanceFromHorWall() {
    if (this.movingDown()) {
      return document.body.clientHeight - ( this.location.y );
    } else {
      return this.location.y;
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  draw(){
    c.beginPath();
    c.arc(this.location.x, this.location.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {

    this.nextPosition();

    this.draw();

  }

  // Collision Detection
  detectCollision(){

    for (var i = 0; i < boids.length; i++) {
      if ( this === boids[i]  ) { continue; }
      if ( getDistance( this.location.x, this.location.y, boids[i].location.x, boids[i].location.y) - ( this.radius + boids[i].radius ) < 0 ) {
        // console.log('collision');
        // console.log(this.radius +'+'+ boids[i].radius);
        this.resolveCollision( this, boids[i]);
      }
    }
  }

  /**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

 rotate(velocity, angle) {
    var rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
  }

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */
 resolveCollision(particle, otherParticle) {
    var xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    var yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    var xDist = otherParticle.location.x - particle.location.x;
    var yDist = otherParticle.location.y - particle.location.y;

    // Prevent accidental overlap of particles
    if ( xVelocityDiff * xDist + yVelocityDiff * yDist >= 0 ) {

      // Grab angle between the two colliding particles
      var angle = -Math.atan2(otherParticle.location.y - particle.location.y, otherParticle.location.x - particle.location.x);

      // Store mass in var for better readability in collision equation
      var m1 = particle.mass;
      var m2 = otherParticle.mass;

      // Velocity before equation
      var u1 = this.rotate(particle.velocity, angle);
      var u2 = this.rotate(otherParticle.velocity, angle);

      // Velocity after 1d collision equation
      var v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
      var v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

      // Final velocity after rotating axis back to original location
      var vFinal1 = this.rotate(v1, -angle);
      var vFinal2 = this.rotate(v2, -angle);

      // Swap particle velocities for realistic bounce effect
      particle.velocity.x = vFinal1.x;
      particle.velocity.y = vFinal1.y;
      particle.velocity = this.limitVector( particle.velocity, particle.maxSpeed);

      otherParticle.velocity.x = vFinal2.x;
      otherParticle.velocity.y = vFinal2.y;
      otherParticle.velocity = this.limitVector( otherParticle.velocity, otherParticle.maxSpeed);
    }

  }

}
