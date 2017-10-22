class Boid {

  constructor(boid) {

    this.id = boid.id;
    this.x = boid.x;
    this.y = boid.y;
    this.containerWidth = document.body.clientWidth;
    this.containerHeight = document.body.clientHeight;
    if (boid.containerWidth < boid.containerHeight) {
      this.containerSize = boid.containerWidth;
    } else {
      this.containerSize = boid.containerHeight;
    }
    this.radius = boid.radius;
    switch(this.id % 10) {
      case 0:
        this.color = '#4286f4';
        break;
      case 1:
        this.color = '#42ebf4';
        break;
      case 2:
        this.color = '#41f4a0';
        break;
      case 3:
        this.color = '#8ff441';
        break;
      case 4:
        this.color = '#f4e841';
        break;
      case 5:
        this.color = '#f48341';
        break;
      case 6:
        this.color = '#f44141';
        break;
      case 7:
        this.color = '#a341f4';
        break;
      case 8:
        this.color = '#f9f9f9';
        break;
      default:
        this.color = '#f4416a';
        break;
    }
    // Cohesion, Aversion, Agility
    this.cohesion = .5;
    this.aversion = .5;
    this.agility = this.getRandomInt(20,80) / 100;

    // Direction
    this.degrees = Math.floor(Math.random() * 360) + 1;
    this.prevDirection = this.degrees * Math.PI / 180;
    this.direction = this.getRadians();

    // Accel and Velocity
    this.quickness = this.getRandomInt(20,50) / 100;
    this.maxSpeed = 20 * this.quickness;
    this.prevSpeed = this.quickness * ( this.maxSpeed );
    this.speed = this.prevSpeed;
    this.ax = 5;
    this.ay = 5;
    this.vx = this.speed * Math.cos(this.direction);
    this.vy = this.speed * Math.sin(this.direction);
    this.prevVx = this.vx;
    this.PrevVy = this.vy;

    var theCanvas = document.getElementById('boids');
    var thisBoid = document.createElement('DIV');
    thisBoid.className ='boid';
    thisBoid.id = 'boid'+this.id;
    thisBoid.style.backgroundColor = this.color;
    theCanvas.appendChild(thisBoid);
    TweenMax.to("#boid"+this.id, false, { left: this.x, top: this.y} );

  }

  nextPosition() {


    // If getting close to border, slow down
    if (this.distanceFromVertWall() < 20) {
      this.ax = -5;
    } else {
      this.ax = 5;
    }
    if (this.distanceFromHorWall() < 20) {
      this.ay = -5;
    } else {
      this.ay = 5;
    }

    this.prevVx = this.vx;
    this.prevVy = this.vy;
    this.vx = this.prevVx * ( 1 + (this.ax / 100) );
    this.vy = this.prevVy * ( 1 + (this.ay / 100) );

    if (this.vx > this.maxSpeed) this.vx = this.maxSpeed;
    else if (this.vx < 1) this.vx = 1;
    if (this.vy > this.maxSpeed) this.vy = this.maxSpeed;
    else if (this.vy < 1) this.vy = 1;

    this.direction = Math.atan2(this.vy,this.vx);
    this.degrees = this.getDegrees();

    var x2 = this.x + this.vx;
    var y2 = this.y + this.vy;
    this.x = x2;
    this.y = y2;

    TweenMax.to("#boid"+this.id, false, { left: this.x, top: this.y} );

    this.prevSpeed = this.speed;
  }

  // slowDown() {
  //   this.speed = this.prevSpeed - this.maxSpeed / 10;
  //   if (this.speed < 1) {
  //     this.speed = 1;
  //   }
  // }
  //
  // speedUp() {
  //   this.speed = this.prevSpeed + this.maxSpeed / 10;
  //   if (this.speed > this.maxSpeed) {
  //     this.speed = this.maxSpeed;
  //   }
  // }

  getDirection() {

  }

  movingRight() {
    if ( this.degrees < 90 || this.degrees > 270 ) return true;
    else return false;
  }

  movingDown() {
    if ( this.degrees > 0 && this.degrees < 180 ) return true;
    else return false;
  }

  changeDirection() {
    // console.log(this.id);
    // console.log('x: '+this.x);
    // console.log('y: '+this.y);






  }

  curve(degrees) {
    var newDeg = degrees * this.agility;
    this.degrees += newDeg;
    this.direction = this.getRadians();
    this.vx = this.speed * Math.cos(this.direction);
    this.vy = this.speed * Math.sin(this.direction);

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
      } else {
        this.y = 2;
      }
      this.degrees = (360 - this.degrees) % 360;
      this.direction = this.getRadians();
    }
    if ( this.distanceFromVertWall() < 1  ) {
      if ( this.movingRight() ) {
        this.x = document.body.clientWidth - 2;
      } else {
        this.x = 2;
      }
      this.degrees = (180 - this.degrees);
      if (this.degrees < 0) { this.degrees += 360; }
      this.direction = this.getRadians();
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

  getRadians() {
    return this.degrees * Math.PI / 180;
  }

  getDegrees() {
    return this.direction / (Math.PI / 180);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}
