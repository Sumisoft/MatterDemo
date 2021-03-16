import Matter from "matter-js";


import matterCharacter from './matterCharacter'
import projectile from './projectile'

class enemy extends matterCharacter{

  constructor(props){
    super(props)
    this.charCategory = 1 // define all eneies into category 1
    this.props = props
  }



  dragon( props ){

    var params = this.getParams(this.charCategory)

    // replace the color with sprites
    params.render.strokeStyle = 'red'

    // define character's body. parametres defined in matterCharacter.jsx
    this.rectangle(
      this.x,
      this.y,
      this.charWidth,
      this.charHeight,
      params
    )

    const xVelocity = this.props.level/10
    this.setVelocity(-xVelocity, 0 )
    this.setFriction()

    return this.body
  }


  dragonWithFire( props ){

    this.dragon(props)

    this.projectile = new projectile({
      type: this.type,
      level: this.level,
      charCategory: this.charCategory,
    })

    return this.body
  }




  /// create a projectile object, add it to the world and
  /// store it into a buffer for future use
  add(props){

    var charObj
    switch( this.props.charType ){
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

    // Matter.World.add(props.engine.world, [charObj]);

    return this.body
  }

}

export default enemy
