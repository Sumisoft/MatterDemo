/**
 * collision Management
 * @desc manages the interactions between the heros and enemies
 * @author Nik Sumikawa
 */

import Matter from "matter-js";
import enemy from '../Characters/enemies'

export class collision {

  constructor( bodyA, bodyB, engine ){
    // default defintions

    this.bodyA = bodyA
    this.bodyB = bodyB
    // this.parameters(bodyB)
    // this.parameters(bodyA)

    this.refresh( engine )
  }

  // returns True when the two bodies are in different groups
  isOpponent(){
    if( this.bodyA.group !== this.bodyB.group ) return true
    return false
  }

  // returns True when one body is a projectile colliding with a body
  projectile(body1, body2){
    // do nothing when the object is not a projectile
    if( body1.objType !== 'projectile' ) return false

    // reduce the health of the second object and update the object
    // with the new health value
    if( body2.objType !== 'projectile' ){
      body2.health = body2.health - body1.health
      Matter.Body.set(body2, 'health', body2.health )

      Matter.Body.setVelocity(body2, body2.prevVelocity )

    }

    // returns true, which means remove the object at the completion
    // of the collision routine
    return true
  }

  refresh( engine ){

    // do nothing when the two objects belong to the same group
    if( !this.isOpponent() ) return

    const delFlagA = this.projectile(this.bodyA, this.bodyB)
    const delFlagB = this.projectile(this.bodyB, this.bodyA)

    // remove the object based on the flag status
    if( delFlagA ) Matter.World.remove(engine.world, this.bodyA)
    if( delFlagB ) Matter.World.remove(engine.world, this.bodyB)

    if( this.bodyA.health <= 0 ) Matter.World.remove(engine.world, this.bodyA)
    if( this.bodyB.health <= 0 ) Matter.World.remove(engine.world, this.bodyB)
  }





}


export default collision
