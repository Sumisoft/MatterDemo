import Matter from "matter-js";

import matterObj from './matterObj'

const CHAR_WIDTH = 30
const CHAR_HEIGHT = 50

class matterCharacter extends matterObj{

  constructor( x, y, health, engine){
    super(health)
    this.engine = engine
    this.createdOn = engine.timing.timestamp
    this.updatedOn = engine.timing.timestamp

    this.projectiles = []

    this.movement = {
      speed: 0,
    }

    this.projectile = {
      rate: 0,
      speed: 0,
      maxDistance: 0
    }

    this.rectangle( x, y, CHAR_WIDTH, CHAR_HEIGHT )
  }

  setMovement( speed ){
    this.movement.speed = speed
    Matter.Body.setVelocity( this.body, {x: speed, y: 0})
    this.body.friction = 0.05;
    this.body.frictionAir = 0.0005;
    this.body.restitution = 0.9;
  }

  setProjectiles( rate, speed, maxDistance=undefined ){
    this.projectile = {
      rate: rate,
      speed: speed,
      maxDistance: maxDistance
    }
  }

  /// create a projectile object, add it to the world and
  /// store it into a buffer for future use
  addProjectile(engine){

    var projObj = new matterObj(1)

    var x = this.body.position.x + CHAR_WIDTH
    if( this.projectile.speed < 0 ) x = this.body.position.x - CHAR_WIDTH

    const y = this.body.position.y
    projObj.circle(x, y, 10)

    projObj.setVelocity(this.projectile.speed, 0)

    this.projectiles.push(projObj)

    Matter.World.add(engine.world, projObj.body);
  }

  // update the world periodically
  update( engine ){
    const timestamp = engine.timing.timestamp
    const lastUpdated = Math.floor((timestamp - this.updatedOn)/1000)
    if( this.projectile.rate > 0 ){
      if( lastUpdated > this.projectile.rate ){
        this.addProjectile(engine)
        this.updatedOn = timestamp
      }
    }
  }

  //
  projCollision(bodyA, bodyB, engine){

    var index
    var projFlag = false

    const projArray = this.projectiles.map(r => r.body)

    index = projArray.indexOf(bodyA)
    if( index >= 0){
      if( this.projectiles[index].collision(engine) ){
        delete this.projectiles[index]
      }
      projFlag = true
    }

    index = projArray.indexOf(bodyB)
    if( index >= 0){
      if( this.projectiles[index].collision(engine) ){
        delete this.projectiles[index]
      }
      projFlag = true
    }

    return projFlag

  }


}


export default matterCharacter
