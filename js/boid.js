class Boid {

  constructor(boid) {

    // Initial Properties
    this.id = boid.id;
    this.x = boid.x;
    this.y = boid.y;
    this.radius = boid.radius * this.getRandomInt(50,100) / 100;
    this.cohesion = boid.cohesion * this.getRandomInt(20,80) / 100;
    this.introversion = boid.introversion * this.getRandomInt(20,80) / 100;
    this.agility = boid.agility * this.getRandomInt(20,80) / 100;
    this.quickness = boid.quickness * this.getRandomInt(50,100) / 100;
    this.racism = boid.racism * this.getRandomInt(20,80) / 100;
    this.color = boid.color;
    this.mass = (4/3) * Math.PI * Math.pow( this.radius,3 );

    // Direction
    this.prevRadians = Math.PI * this.getRandomInt(-99,100) / 100;
    this.radians = this.prevRadians;

    // Accel and Velocity
    this.maxSpeed = 15 * this.quickness;
    this.prevSpeed = this.maxSpeed * .5;
    this.speed = this.prevSpeed;
    this.velocity = {
      x: this.speed * Math.cos( this.radians ),
      y: this.speed * Math.sin( this.radians )
    }
    this.prevVx = this.velocity.x;
    this.PrevVy = this.velocity.y;
    this.a = 5;
    this.ax = Math.cos(this.radians) / this.a;
    this.ay = Math.sin(this.radians) / this.a;

  }

  nextPosition() {

    // If getting close to border, slow down
    // if (this.distanceFromVertWall() < 20) {
    //   this.ax = - Math.cos(this.radians) * 5;
    // } else {
    //   this.ax = Math.cos(this.radians) * 5;
    // }
    // if (this.distanceFromHorWall() < 20) {
    //   this.ay = - Math.sin(this.radians) * 5;
    // } else {
    //   this.ay = Math.sin(this.radians) * 5;
    // }


    // this.prevVx = this.velocity.x;
    // this.prevVy = this.velocity.y;
    // this.velocity.x = this.prevVx * ( 100 + this.ax ) / 100;
    // this.velocity.y = this.prevVy * ( 100 + this.ay ) / 100;

    // New X-Velocity
    if ( Math.abs(this.velocity.x) > Math.abs( Math.cos(this.radians) * this.maxSpeed ) ) {
      // this.ax = 0;
      if (this.velocity.x < 0) {
        this.velocity.x = 0 - Math.cos(this.radians) * this.maxSpeed;
      }
      else {
        this.velocity.x = Math.cos(this.radians) * this.maxSpeed;
      }
    } else if ( Math.abs(this.velocity.x) < this.velocity.x ) {
      console.log()
      // this.ax = 0;
      this.velocity.x = 0;
    }
    // New Y-Velocity
    if ( Math.abs(this.velocity.y) > Math.abs( Math.sin(this.radians) * this.maxSpeed ) ) {
      // this.ay = 0;
      if (this.velocity.y < 0) {
        this.velocity.y = 0 - Math.sin(this.radians) * this.maxSpeed;
      }
      else {
        this.velocity.y = Math.sin(this.radians) * this.maxSpeed;
      }
    } else if ( Math.abs(this.velocity.y) < this.velocity.y ) {
      // this.ay = 0;
      this.velocity.y = 0;
    }


    // Angle
    this.radians = Math.atan2(this.velocity.y,this.velocity.x);
    this.degrees = this.radians * 180/Math.PI;

    // New Position
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;

    // Set Previous
    this.prevSpeed = this.speed;

    // console.log('P: '+this.x+', '+this.y);
    // console.log('S: '+this.speed);
    // console.log('V: '+this.velocity.x +', '+this.velocity.y);
    // console.log('D: '+this.getDegrees(this.radians));
    // console.log('R: '+this.radians);
    // console.log('A: '+this.ax+', '+this.ay);
    this.curve();
  }

  getDirection() {

  }

  movingRight() {
    if ( ( this.radians > 0 && this.radians < .5 * Math.PI ) || ( this.radians < 0 && this.radians > -.5 * Math.PI ) ) {
      return true;
    } else {
      return false;
    }
  }

  movingDown() {
    if ( this.radians > 0 ) {
      return true;
    } else {
      return false;
    }
  }

  changeDirection() {


  }

  curve() {

    this.radians = this.radians - this.getRandomInt(-3,3) / 100 * Math.PI;
    this.setVelocities();
  }

  // Check for boid collisions and change course
  avoidTheBoids() {

  }

  // Move towards boids if far away
  approachBoids() {

  }

  // Detect a wall hit and bounce
  wallBounce() {
    if ( this.distanceFromHorWall() < this.radius  ) {
      if ( this.movingDown() ) {
        this.y = document.body.clientHeight - this.radius;
        this.radians = -this.radians;
        this.setVelocities();
      } else {
        this.y = this.radius;
        this.radians = -this.radians;
        this.setVelocities();
      }

    }
    if ( this.distanceFromVertWall() < this.radius  ) {
      if ( this.movingRight() ) {
        this.x = document.body.clientWidth - this.radius;
        this.radians = - Math.PI - this.radians;
        this.setVelocities();
      } else {
        this.x = this.radius;
        this.radians = - Math.PI - this.radians;
        this.setVelocities();
      }

    }
  }

  distanceFromVertWall() {
    if (this.movingRight()) {
      return document.body.clientWidth - ( this.x );
    } else {
      return this.x;
    }

  }

  distanceFromHorWall() {
    if (this.movingDown()) {
      return document.body.clientHeight - ( this.y );
    } else {
      return this.y;
    }
  }

  setVelocities() {
    this.velocity.x = this.speed * Math.cos(this.radians);
    this.velocity.y = this.speed * Math.sin(this.radians);
  }

  getDegrees(radians) {
    var degs = radians * 180 / Math.PI;
    if ( degs < 0 ) {
      return Math.abs(degs);
    } else {
      return 360 - degs;
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  draw(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {

    this.nextPosition();

    // Wall Check
    var distanceFromHorWall = this.distanceFromHorWall();
    var distanceFromVertWall =this.distanceFromVertWall();

    // Check for borders
    if ( distanceFromHorWall < this.radius || distanceFromVertWall < this.radius  ) {
      this.wallBounce();
    } else {

      // this.curve(this.getRandomInt(-10,10));
    }

    // Collision Detection
    for (var i = 0; i < boids.length; i++) {
      if ( this === boids[i] && this.radius !== boids[i].radius ) continue;
      if ( getDistance( this.x, this.y, boids[i].x, boids[i].y) - ( this.radius + boids[i].radius ) < 0 ) {
        console.log('collision');
        console.log(this.radius +'+'+ boids[i].radius);
        this.resolveCollision( this, boids[i]);
          // this.velocity.x = 0;
        // this.velocity.y = 0;
        // boids[i].vx = 0;
        // boids[i].vy = 0;
      }
    }

    // Boid avoidance
    // this.avoidTheBoids();

    this.draw();
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

    var xDist = otherParticle.x - particle.x;
    var yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if ( xVelocityDiff * xDist + yVelocityDiff * yDist >= 0 ) {

      // Grab angle between the two colliding particles
      var angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

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

      otherParticle.velocity.x = vFinal2.x;
      otherParticle.velocity.y = vFinal2.y;
    }

  }

}
