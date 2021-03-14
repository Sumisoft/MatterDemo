import Matter from "matter-js";




class matterObj{

  constructor( health ){
    this.body = undefined
    this.health = health
  }

  rectangle( x, y, h, w, params={} ){
    this.body = Matter.Bodies.rectangle(x, y, h, w, params);
  }

  circle( x, y, r, params={} ){
    this.body = Matter.Bodies.circle(x, y, r, params);
  }

  setFriction(){
    this.body.friction = 0.05;
    this.body.frictionAir = 0.0005;
    this.body.restitution = 0.9;
  }

  setVelocity( x, y ){
    Matter.Body.setVelocity( this.body, {x: x, y: y})
  }

  isCollision( bodyA, bodyB){
    if((bodyA === this.body)|(bodyB === this.body)) return true
    return false
  }

  collision( engine ){

    this.health = this.health - 1

    if(this.health === 0){
      Matter.World.remove(engine.world, this.body);
      return true
    }

    return false
  }

  getParams( category ){
    const style = {
      0: {
        id: 0x0002,
        category: 0x0002,
        mask: 0x0004,
        color: '#f55a3c'
      },
      1: {
        id: 0x0004,
        category: 0x0004,
        mask: 0x0002,
        color: '#063e7b'
      },
    }

    return {
      collisionFilter: {
          category: style[category].category,
          mask: style[category].mask
      },
      render: {
          strokeStyle: style[category].color,
          fillStyle: 'transparent',
          lineWidth: 2
      }
    }
  }

}

export default matterObj
