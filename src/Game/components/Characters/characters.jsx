import Matter from "matter-js";


import matterCharacter from './matterCharacter'
import projectile from './projectile'

class characters extends matterCharacter{

  constructor(props){
    super(props)
    this.type = props.type
  }



  ninja( props ){

    var params = this.getParams(this.charCategory)

    // replace the color with sprites
    params.render.strokeStyle = 'yellow'

    // define character's body. parametres defined in matterCharacter.jsx
    this.rectangle(
      this.x,
      this.y,
      this.charWidth,
      this.charHeight,
      params
    )

    this.projectile = new projectile({
      type: this.type,
      level: this.level,
    })

    return this.body
  }



  column( x, y, r, params={} ){
    this.body = Matter.Bodies.circle(x, y, r, params);
  }

  friction(){
    this.body.friction = 0.05;
    this.body.frictionAir = 0.0005;
    this.body.restitution = 0.9;
  }

  setVelocity( x, y ){
    Matter.Body.setVelocity( this.body, {x: x, y: y})
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

export default characters
