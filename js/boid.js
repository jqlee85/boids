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
    // this.color = '#111111';
    this.cohesion = .5;
    this.aversion = .5;
    this.prevSpeed = boid.quickness * ( this.containerSize / 50 );
    this.degrees = Math.floor(Math.random() * 360) + 1;
    // this.degrees = 0;
    this.prevDirection = this.degrees * Math.PI / 180;
    this.direction = this.degrees * Math.PI / 180;

    var theCanvas = document.getElementById('boids');
    var thisBoid = document.createElement('DIV');
    thisBoid.className ='boid';
    thisBoid.id = 'boid'+this.id;
    thisBoid.style.backgroundColor = this.color;
    theCanvas.appendChild(thisBoid);
    TweenMax.to("#boid"+this.id, false, { left: this.x, top: this.y} );

  }

  nextPosition() {

    this.speed = this.prevSpeed;

    var x2 = this.x + Math.cos( this.direction ) * this.speed;
    var y2 = this.y + Math.sin( this.direction ) * this.speed;
    this.x = x2;
    this.y = y2;

    if (this.x < -10) {
      var movingLeft = this.movingRight() ? 'moving right' : 'moving left';
      console.log(this.id +' is at '+ this.x + 'and is' + movingLeft);
      console.log('degrees is '+ this.degrees);
    }


    TweenMax.to("#boid"+this.id, false, { left: this.x, top: this.y} );
    // this.theBoid.position = [x2,y2];

  }

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
    if ( this.distanceFromHorWall() < 1  ) {
      // console.log('horizontal wall hit');
      if ( this.movingDown() ) {
        // console.log('was down');
        this.y = document.body.clientHeight -2;
      } else {
        // console.log('was up');
        this.y = 2;
      }
      this.degrees = (360 - this.degrees) % 360;
      this.direction = this.getRadians();
    }
    if ( this.distanceFromVertWall() < 1  ) {
      // console.log('vertical wall hit');
      if ( this.movingRight() ) {
        // console.log('was right');
        this.x = document.body.clientWidth - 2;
      } else {
        // console.log('was left');
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


}
