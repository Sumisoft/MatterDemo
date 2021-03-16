import Matter from "matter-js";

import matterObj from './matterObj'
import projectile from './projectile'

class matterCharacter extends matterObj{

  constructor( props ){
    super(props.health)
    this.createdOn = undefined
    this.updatedOn = undefined

    this.charHeight = 50
    this.charWidth = 30

    this.projectileArray = []

    this.movement = {
      speed: 0,
    }

    console.log( 'what are the props', props)
    this.x = props.x
    this.y = props.y

    this.level = 1
    this.type = 1

    const keys = Object.keys(props)
    if( keys.includes('height') ) this.height = props.height
    if( keys.includes('width') ) this.width = props.width
    if( keys.includes('category') ) this.category = props.category
    if( keys.includes('level') ) this.level = props.level
    if( keys.includes('type') ) this.type = props.type


    // this.addBody( props.x, props.y )
    //
    this.projectile = new projectile({
      type: this.type,
      level: this.level,
    })
  }

  get height(){ return this.charHeight }
  set height(value){ this.charHeight = value}

  get width(){ return this.charWidth }
  set width(value){ this.charWidth = value/2}

  get category(){ return this.charCategory }
  set category(value){ this.charCategory = value}

  get level(){ return this.charLevel }
  set level(value){ this.charLevel = value}

  get type(){ return this.charType }
  set type(value){ this.charType = value}

  setMovement( speed ){
    this.movement.speed = speed
    Matter.Body.setVelocity( this.body, {x: speed, y: 0})
    this.body.friction = 0.05;
    this.body.frictionAir = 0.0005;
    this.body.restitution = 0.9;
  }

  addBody( x, y ){
    const params = this.getParams(this.charCategory)
    this.rectangle( x, y, this.charHeight, this.charHeight, params )
  }



  // update the world periodically
  refresh( props ){
    const timestamp = props.engine.timing.timestamp
    if( this.updatedOn === undefined ) this.updatedOn = props.engine.timing.timestamp

    const lastUpdated = Math.floor((timestamp - this.updatedOn)/1000)

    if( lastUpdated > this.projectile.rate ){
      this.projectile.add(this, props.engine)
      this.updatedOn = timestamp
    }

    if( lastUpdated > 1 ){
      this.garbageCollection(props)
      this.updatedOn = timestamp
    }


  }

  //
  projCollision(bodyA, bodyB, engine){

    var index
    var projFlag = false

    const projArray = this.projectileArray.map(r => r.body)

    index = projArray.indexOf(bodyA)
    if( index >= 0){
      if( this.projectileArray[index].collision(engine) ){
        delete this.projectileArray[index]
      }
      projFlag = true
    }

    index = projArray.indexOf(bodyB)
    if( index >= 0){
      if( this.projectileArray[index].collision(engine) ){
        delete this.projectileArray[index]
      }
      projFlag = true
    }

    return projFlag

  }

  bodyCollision(bodyA, bodyB, engine){
    if( (this.body === bodyA)|(this.body === bodyB) ){
      return this.collision(engine)
    }

    return false
  }

  // removes objects (such as projectileArray) that are offscreen
  garbageCollection( props ){
    //TODO: Add character garbage collection
    this.projectile.garbageCollection(props)
  }
}


export default matterCharacter
