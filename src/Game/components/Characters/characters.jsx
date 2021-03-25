import Matter from "matter-js";


import matterObj from './matterObj'
import projectile from './projectile'

class heros extends matterObj{

  constructor(props){
    super(props)

    this.character = new matterObj({group: 0})

    this.projectileArray = []
    this.projectile = new projectile({
      type: this.type,
      level: this.level,
    })

  }


  ninja( props ){

    //TODO: compute health based on current level
    this.character.health = 2
    this.character.type = 'ninja'

    // define character's body. parametres defined in matterCharacter.jsx
    this.character(
      props.x,
      props.y,
      props.charWidth,
      props.charHeight
    )

    return this.body
  }

  /// create a projectile object, add it to the world and
  /// store it into a buffer for future use
  add(props){

    var charObj
    switch( this.type ){
      case 1 :
        charObj = this.ninja(props)
        break

      default :
        charObj = this.ninja(props)
        break
    }

    // Matter.World.add(props.engine.world, [charObj]);

    return this.body
  }

}

export default heros
