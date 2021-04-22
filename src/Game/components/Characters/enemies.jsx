import Matter from "matter-js";
import matterObj from './matterObj'
import projectile from './projectile'

class enemy {

  constructor(props){
      this.character = new matterObj({group: 1})
      this.projectile = new projectile({group: 1})
  }



  dragon( props ){

    // define character's body. parametres defined in matterCharacter.jsx
    this.character.character(
      props.x,
      props.y,
      props.width,
      props.height,
    )

    const velocity = {x: -props.level, y: 0}

    //TODO: compute health based on current level
    this.character.setParameters({
      health: 0.1 +  props.level/10,
      level: props.level,
      objType: 'character',
      velocity: velocity
    })


    this.character.setVelocity(velocity.x, velocity.y)
    this.character.setFriction()

    return this.character
  }


  dragonWithFire( props ){
    // define character's body. parametres defined in matterCharacter.jsx
    this.character.character(
      props.x,
      props.y,
      props.width,
      props.height,
    )

    //TODO: compute health based on current level
    this.character.setParameters({
      health: 2 + props.level/10,
      level: props.level,
      objType: 'character',
    })

    //
    // this.character.setVelocity(-props.level/10, 0)
    // this.character.setFriction()

    this.projectileType = 'single'
    this.projectileRate = 1 + props.level/10

    return this.character
  }




  /// create a projectile object, add it to the world and
  /// store it into a buffer for future use
  add(props){

    var charObj
    switch( props.charType ){
      case 'dragon':
      case 1 :
        charObj = this.dragon(props)
        break

      case 2 :
        charObj = this.dragonWithFire(props)
        break


      default :
        charObj = this.dragon(props)
        break
    }

    charObj.toWorld(props.engine)
    // Matter.World.add(props.engine.world, [charObj]);

    return this.body
  }


  // update the world periodically to add projectiles
  // and remove offscreen objects
  refresh( props ){

    const timestamp = props.engine.timing.timestamp
    if( this.updatedOn === undefined ) this.updatedOn = props.engine.timing.timestamp

    const lastUpdated = Math.floor((timestamp - this.updatedOn)/1000)

    if( lastUpdated > this.projectileRate ){
      this.projectile.add(this.character, props.engine)
      this.projectile.garbageCollection(props)
      this.updatedOn = timestamp
    }


    const padding = 0
    // perform callback function to end the game when the enemy enters
    // the offscreen region on the heros side
    if( this.character !== undefined ){
      if( (this.character.bodyObj.position.x < -padding ) ){
          Matter.World.remove(props.engine.world, this.character.bodyObj);
          this.character = undefined

          // perform callback to update parent state
          if( props.callback !== undefined ) props.callback({group: '1', type:'outOfBounds'})
      }
    }

  }

}

export default enemy
