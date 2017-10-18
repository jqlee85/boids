class Boid {

  constructor(boid) {

    this.x = boid.x;
    this.y = boid.y;
    this.containerWidth = boid.containerWidth;
    this.containerHeight = boid.containerHeight;
    if (boid.containerWidth < boid.containerHeight) {
      this.containerSize = boid.containerWidth;
    } else {
      this.containerSize = boid.containerHeight;
    }
    this.radius = boid.radius;
    this.color = '#111111';
    this.strokeStyle = 'rgba(17, 17, 17,.9)';
    this.cohesion = .5;
    this.aversion = .5;
    this.prevSpeed = boid.quickness * ( this.containerSize / 50 );
    this.degrees = Math.floor(Math.random() * 360) + 1;
    // this.degrees = 0;
    this.prevDirection = this.degrees * Math.PI / 180;
    this.direction = this.degrees * Math.PI / 180;

    this.theBoid = new Path.Circle({
      center: [boid.x , boid.y],
      radius: this.radius,
      fillColor: '#111111'
    });


  }

  nextPosition() {

    this.speed = this.prevSpeed;

    var x2 = this.x + Math.cos( this.direction ) * this.speed;
    var y2 = this.y + Math.sin( this.direction ) * this.speed;
    this.x = x2;
    this.y = y2;

    this.theBoid.position = [x2,y2];

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

  changeDirection( collisionObject ) {

  }

  distanceFromHorWall() {
    if (this.movingRight()) {
      return this.containerWidth - ( this.x + this.radius )
    } else {
      return this.x - this.radius;
    }

  }

  distanceFromVertWall() {
    if (this.movingDown()) {
      return this.containerWidth - ( this.y + this.radius )
    } else {
      return this.y - this.radius;
    }
  }

  getRadians() {
    return this.degrees * Math.PI / 180;
  }


}
