class Boid {

  constructor(boid) {

    this.x = boid.x;
    this.y = boid.y;
    if (boid.containerWidth < boid.containerHeight) {
      this.containerSize = boid.containerWidth;
    } else {
      this.containerSize = boid.containerHeight;
    }
    this.radius = boid.radius;
    this.color = '#a7f9b9';
    this.strokeStyle = 'rgba(167, 249, 185,.5)';
    this.social = .5;
    this.prevSpeed = boid.quickness * ( this.containerSize / 50 );
    this.prevDirection = ( Math.floor(Math.random() * 360) + 1 ) * Math.PI / 180;
    this.direction = ( Math.floor(Math.random() * 360) + 1 ) * Math.PI / 180;

    this.theBoid = new Path.Circle({
      center: [boid.x , boid.y],
      radius: this.radius,
      fillColor: '#a7f9b9'
    });


  }

  nextPosition(){

    this.speed = this.prevSpeed;

    // console.log(this.speed);

    var x2 = this.x + Math.cos( this.direction ) * this.speed;
    var y2 = this.y + Math.sin( this.direction ) * this.speed;
    this.x = x2;
    this.y = y2;

    this.theBoid.position = [x2,y2];

  }

  getDirection(){

  }


}
