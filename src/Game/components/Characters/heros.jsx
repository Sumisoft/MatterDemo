

import matterObj from './matterObj'
import projectile from './projectile'

class heros {

  constructor(props){

    this.character = new matterObj({group: 0})
    this.projectile = new projectile({group: 0})

  }


  ninja( props ){

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

    this.projectileType = 'single'
    this.projectileRate = 4 + props.level/10
    return this.character
  }

  sumo( props ){

    // define character's body. parametres defined in matterCharacter.jsx
    this.character.character(
      props.x,
      props.y,
      props.width*3,
      props.height,
    )

    //TODO: compute health based on current level
    this.character.setParameters({
      health: props.level * 5,
      level: props.level,
      objType: 'character',
    })

    return this.character
  }


  /// create a projectile object, add it to the world and
  /// store it into a buffer for future use
  add(props){

    var charObj
    switch( props.heroType ){
      case 'ninja':
      case 1 :
        charObj = this.ninja(props)
        break

      case 'panda':
      case 'sumo':
      case 2 :
        charObj = this.sumo(props)
        break

      default :
        charObj = this.ninja(props)
        break
    }

    charObj.toWorld(props.engine)
    // Matter.World.add(props.engine.world, [charObj]);

    return charObj
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

  }


}

export default heros
