class Boid {

  constructor(boid) {



    // Initial Properties
    this.id = boid.id;
    this.x = boid.x;
    this.y = boid.y;
    this.radius = boid.radius;
    this.cohesion = boid.cohesion;
    this.aversion = boid.aversion;
    this.agility = boid.agility;
    this.quickness = boid.quickness;
    this.color = boid.color;



    // Direction
    this.prevRadians = Math.PI * this.getRandomInt(-99,100) / 100;
    this.radians = this.prevRadians;

    // Accel and Velocity
    this.maxSpeed = 20 * this.quickness;
    this.prevSpeed = this.maxSpeed * .5;
    this.speed = this.prevSpeed;
    this.vx = this.speed * Math.cos(this.radians);
    this.vy = this.speed * Math.sin(this.radians);
    this.prevVx = this.vx;
    this.PrevVy = this.vy;
    this.a = 5;
    this.ax = Math.cos(this.radians) / this.a;
    this.ay = Math.sin(this.radians) / this.a;


  }

  nextPosition() {

    // If getting close to border, slow down
    if (this.distanceFromVertWall() < 100) {
      this.ax = - Math.cos(this.radians) * 5;
    } else {
      this.ax = Math.cos(this.radians) * 5;
    }
    if (this.distanceFromHorWall() < 100) {
      this.ay = - Math.sin(this.radians) * 5;
    } else {
      this.ay = Math.sin(this.radians) * 5;
    }

    this.prevVx = this.vx;
    this.prevVy = this.vy;
    this.vx = this.prevVx * ( 100 + this.ax ) / 100;
    this.vy = this.prevVy * ( 100 + this.ay ) / 100;

    // New X-Velocity
    if ( Math.abs(this.vx) > Math.abs( Math.cos(this.radians) * this.maxSpeed ) ) {
      this.ax = 0;
      if (this.vx < 0) {
        this.vx = 0 - Math.cos(this.radians) * this.maxSpeed;
      }
      else {
        this.vx = Math.cos(this.radians) * this.maxSpeed;
      }
    } else if ( Math.abs(this.vx) < this.vx ) {
      thix.ax = 0;
      this.vx = 0;
    }
    // New Y-Velocity
    if ( Math.abs(this.vy) > Math.abs( Math.sin(this.radians) * this.maxSpeed ) ) {
      this.ay = 0;
      if (this.vy < 0) {
        this.vy = 0 - Math.sin(this.radians) * this.maxSpeed;
      }
      else {
        this.vy = Math.sin(this.radians) * this.maxSpeed;
      }
    } else if ( Math.abs(this.vy) < this.vy ) {
      thix.ay = 0;
      this.vy = 0;
    }

    // Angle
    this.radians = Math.atan2(this.vy,this.vx);
    this.degrees = this.radians * 180/Math.PI;

    // New Position
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // Set Previous
    this.prevSpeed = this.speed;

    // console.log('P: '+this.x+', '+this.y);
    // console.log('S: '+this.speed);
    // console.log('V: '+this.vx +', '+this.vy);
    // console.log('D: '+this.getDegrees(this.radians));
    // console.log('R: '+this.radians);
    // console.log('A: '+this.ax+', '+this.ay);
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

    this.radians ;
    this.vx = this.speed * Math.cos(this.radians);
    this.vy = this.speed * Math.sin(this.radians);

  }

  // Check for boid collisions and change course
  avoidTheBoids() {

  }

  // Move towards boids if far away
  approachBoids() {

  }

  // Detect a wall hit and bounce
  wallBounce() {
    if ( this.distanceFromHorWall() < 1  ) {
      if ( this.movingDown() ) {
        this.y = document.body.clientHeight -2;
        this.radians = -this.radians;
        this.vx = this.speed * Math.cos(this.radians);
        this.vy = this.speed * Math.sin(this.radians);
      } else {
        this.y = 2;
        this.radians = -this.radians;
        this.vx = this.speed * Math.cos(this.radians);
        this.vy = this.speed * Math.sin(this.radians);
      }
      this.ax = 5;
    }
    if ( this.distanceFromVertWall() < 1  ) {
      if ( this.movingRight() ) {
        this.x = document.body.clientWidth - 2;
        this.radians = - Math.PI - this.radians;
        this.vx = this.speed * Math.cos(this.radians);
        this.vy = this.speed * Math.sin(this.radians);
      } else {
        this.x = 2;
        this.radians = - Math.PI - this.radians;
        this.vx = this.speed * Math.cos(this.radians);
        this.vy = this.speed * Math.sin(this.radians);
      }
      this.ay = 5;
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
    if ( distanceFromHorWall < 1 || distanceFromVertWall < 1  ) {
      this.wallBounce();
    } else {

      this.curve(this.getRandomInt(-10,10));
    }

    // Boid avoidance
    // this.avoidTheBoids();

    this.draw();
  }

}
