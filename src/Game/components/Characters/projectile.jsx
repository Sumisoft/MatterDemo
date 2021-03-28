import Matter from "matter-js";


import matterObj from './matterObj'

class projectile{

  constructor(props){
    this.projectiles = []
  }

  // returns the starting position for the standard projectile
  startingPosition( charObj ){

    const vertices = charObj.bodyObj.vertices
    const width = vertices[1].x - vertices[0].x
    // const height = verticies[1].y - verticies[0].y

    var x = charObj.bodyObj.position.x + width

    // invert the starting point to the left side when the
    // character belongs to the enemy group
    if( charObj.group === 1 ){
      x = charObj.bodyObj.position.x - width
    }

    return {
      x: x,
      y: charObj.bodyObj.position.y,
      r: width/4
    }
  }

  // sets the projectile speed based on the character object parameters
  parameters( charObj ){

    var speed = 2 + charObj.bodyObj.level/10

    //invert the direction for enemies
    if(charObj.bodyObj.group === 1) speed = -1 * this.speed

    return {
      health: charObj.bodyObj.level/10,
      maxDistance: Infinity,
      speed: speed
    }
  }


  single( charObj ){

    const position = this.startingPosition( charObj )
    const parameters = this.parameters(charObj)

    var projObj = new matterObj({group: charObj.bodyObj.group})

    projObj.projectile(position.x, position.y, position.r)

    projObj.setParameters({
      health: parameters.health,
      objType: 'projectile',
      level: charObj.bodyObj.level,
    })

    projObj.setVelocity(parameters.speed, 0)
    projObj.setFriction()

    this.projectiles.push(projObj)

    return [projObj.bodyObj]
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
        position.x + (charObj.body.width)*i,
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

  /// create a projectile object, add it to the world and
  /// store it into a buffer for future use
  add(charObj, engine){


    var projObjects
    switch( charObj.projectileType ){

      case 'single':
      case 1 :
        projObjects = this.single(charObj)
        break

      case 'multiple':
      case 2 :
        projObjects = this.multiple(2, charObj)
        break

      case 'spread':
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

  // removes offscreen objects
  garbageCollection( props ){

    const padding = 200
    this.projectiles.forEach( (r, idx) => {
      if( (r.bodyObj.position.x > props.boardWidth - padding) |
          (r.bodyObj.position.x < -padding ) |
          (r.bodyObj.position.y > props.boardHeight - padding) |
          (r.bodyObj.position.y < -padding) ){

          Matter.World.remove(props.engine.world, r.bodyObj);
          delete this.projectiles[idx]

        }

      // Matter.World.remove(props.engine.world, r);
      // delete this.projectiles[idx]

    })

  }



}

export default projectile
