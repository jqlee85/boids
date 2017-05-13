class Boid {

  constructor(boid) {

    this.x = boid.x;
    this.y = boid.y;
    if (boid.containerWidth < boid.containerHeight) {
      this.containerSize = boid.containerWidth;
    } else {
      this.containerSize = boid.containerHeight;
    }
    this.color = '#a7f9b9';
    this.strokeStyle = 'rgba(167, 249, 185,.5)';
    this.social = .5;
    this.prevSpeed = boid.quickness * ( this.containerSize / 20 );
    this.prevDirection = ( Math.floor(Math.random() * 360) + 1 ) * Math.PI / 180;
    this.direction = ( Math.floor(Math.random() * 360) + 1 ) * Math.PI / 180;

  }

  nextPosition(){

    this.speed = this.prevSpeed;

    var x2 = this.x + Math.cos( this.direction ) * this.prevSpeed;
    var y2 = this.y + Math.sin( this.direction ) * this.prevSpeed;
    this.x = x2;
    this.y = y2;

    //Determine next position
    return {
      x: x2,
      y: y2,
      strokeStyle: this.strokeStyle,
      fillColor: this.color
    }

  }

  getDirection(){

  }


}
