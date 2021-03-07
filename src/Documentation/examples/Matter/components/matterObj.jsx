import React from "react";
import Matter from "matter-js";




class matterObj{

  constructor( health ){
    this.body = undefined
    this.health = health
  }

  rectangle( x, y, h, w ){
    this.body = Matter.Bodies.rectangle(x, y, h, w, { restitution: 0.5 });
  }

  circle( x, y, r ){
    this.body = Matter.Bodies.circle(x, y, r, { restitution: 0.5 });

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

}

export default matterObj
