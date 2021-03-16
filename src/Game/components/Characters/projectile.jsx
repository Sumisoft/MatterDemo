import Matter from "matter-js";


import matterObj from './matterObj'

class projectile extends matterObj{

  constructor(props){
    super()
    this.health = 1
    this.level = props.level
    this.type = props.type

    this.rate = 1 + props.level/10
    this.maxDistance = Infinity

    this.speed = 2 + props.level/10
    if(props.charCategory === 1) this.speed = -1 * this.speed //invert the direction for enemies
    
    this.projectiles = []
  }

  // returns the starting position for the standard projectile
  startingPosition( charObj ){
    var x = charObj.body.position.x + charObj.charWidth
    if( this.speed < 0 ) x = charObj.body.position.x - charObj.charWidth

    return {
      x: x,
      y: charObj.body.position.y,
      r: charObj.charWidth/4
    }
  }

  single( charObj ){

    const position = this.startingPosition( charObj )

    var params = this.getParams(charObj.charCategory)

    // replace with sprites
    params.render.strokeStyle = 'yellow'

    var projObj = new matterObj( this.health )
    projObj.circle(position.x, position.y, position.r, params)
    projObj.setVelocity(this.speed, 0)
    projObj.setFriction()

    this.projectiles.push(projObj)

    return [projObj.body]
  }

  multiple( count, charObj ){

    const position = this.startingPosition( charObj )

    var params = this.getParams(charObj.charCategory)

    // replace with sprites
    params.render.strokeStyle = 'orange'

    var proj = []
    for( var i=0; i < count; i++ ){

      var projObj = new matterObj( this.health )

      projObj.circle(
        position.x + (charObj.charWidth)*i,
        position.y,
        position.r,
        params);

      projObj.setVelocity(this.speed, 0)
      projObj.setFriction()

      this.projectiles.push(projObj)

      proj.push( projObj.body )
    }

    return proj
  }

  spread( count, charObj ){
    const position = this.startingPosition( charObj )

    var params = this.getParams(charObj.charCategory)

    // replace with sprites
    params.render.strokeStyle = 'red'

    var proj = []
    for( var i=0; i < count; i++ ){

      const yVelocity = i - (count-1)/2

      var projObj = new matterObj( this.health )
      projObj.circle(position.x, position.y, position.r, params)
      projObj.setVelocity(this.speed, yVelocity)
      projObj.setFriction()


      this.projectiles.push(projObj)

      proj.push( projObj.body )

    }

    return proj
  }

  wave( x, y, r, params={} ){
    this.body = Matter.Bodies.circle(x, y, r, params);
  }

  column( x, y, r, params={} ){
    this.body = Matter.Bodies.circle(x, y, r, params);
  }

  friction( body ){
    body.friction = 0.05;
    body.frictionAir = 0.0005;
    body.restitution = 0.9;
  }

  setVelocity( body, x, y ){
    Matter.Body.setVelocity( body, {x: x, y: y})
  }

  /// create a projectile object, add it to the world and
  /// store it into a buffer for future use
  add(charObj, engine){


    var projObjects
    switch( this.type ){
      case 1 :
        projObjects = this.single(charObj)
        break

      case 2 :
        projObjects = this.multiple(2, charObj)
        break


      case 3 :
        projObjects = this.spread(4, charObj)
        break


      default :
        projObjects = this.single(charObj)
        break
    }

    Matter.World.add(engine.world, projObjects);

    return projObjects
  }

  collision(props){

    var index
    var projFlag = false

    const projArray = this.projectileArray.map(r => r.body)

    index = this.projectiles.indexOf(props.bodyA)
    if( index >= 0){
      if( this.projectiles[index].collision(props.engine) ){
        delete this.projectiles[index]
      }
      projFlag = true
    }

    index = this.projectiles.indexOf(props.bodyB)
    if( index >= 0){
      if( this.projectiles[index].collision(props.engine) ){
        delete this.projectiles[index]
      }
      projFlag = true
    }

    return projFlag

  }


  // removes objects (such as projectileArray) that are offscreen
  garbageCollection( props ){

    const padding = 200
    this.projectiles.forEach( (r, idx) => {
      if( (r.body.position.x > props.boardWidth - padding) |
          (r.body.position.x < -padding ) |
          (r.body.position.y > props.boardHeight - padding) |
          (r.body.position.y < -padding) ){

          Matter.World.remove(props.engine.world, r.body);
          delete this.projectiles[idx]

        }

      // Matter.World.remove(props.engine.world, r);
      // delete this.projectiles[idx]

    })

    // this.projectileArray = this.projectileArray.filter(r => r !== null)

  }

}

export default projectile
