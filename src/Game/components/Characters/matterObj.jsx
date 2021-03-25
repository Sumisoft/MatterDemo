import Matter from "matter-js";




class matterObj{

  constructor( props ){
    this.bodyObj = undefined

    this.group = props.group
  }

  // push key attributes into the body object
  setParameters( props ){
    Matter.Body.set(this.bodyObj, 'group', this.group )
    Matter.Body.set(this.bodyObj, 'health', props.health )
    Matter.Body.set(this.bodyObj, 'level', props.level )
    Matter.Body.set(this.bodyObj, 'objType', props.objType )
  }

  character( x, y, h, w){
    const params = this.getParams(this.group)
    this.bodyObj = Matter.Bodies.rectangle(x, y, h, w, params);
  }

  projectile(x, y, r){
    const params = this.getParams(this.group)
    this.bodyObj = Matter.Bodies.circle(x, y, r, params);
  }

  setFriction(){
    this.bodyObj.friction = 0.05;
    this.bodyObj.frictionAir = 0.0005;
    this.bodyObj.restitution = 0.9;
  }

  setVelocity( x, y ){
    Matter.Body.setVelocity( this.bodyObj, {x: x, y: y})
  }

  toWorld( engine ){
    Matter.World.add(engine.world, [this.bodyObj]);
  }


  getParams( group ){
    const style = {
      0: {
        id: 0x0002,
        category: 0x0002,
        mask: 0x0004,
        color: '#f55a3c'
      },
      1: {
        id: 0x0004,
        category: 0x0004,
        mask: 0x0002,
        color: '#063e7b'
      },
    }

    return {
      collisionFilter: {
          category: style[group].category,
          mask: style[group].mask
      },
      render: {
          strokeStyle: style[group].color,
          fillStyle: 'transparent',
          lineWidth: 2
      }
    }
  }



}

export default matterObj
