import Matter from "matter-js";




class matterObj{

  constructor( props ){
    this.bodyObj = undefined

    this.health = props.health
    this.group = props.group
    this.type = props.type
  }


  get health(){ return this._health }
  set health(value){ this._health = value}

  get type(){ return this._type }
  set type(value){ this._type = value}

  // push key attributes into the body object
  setParameters(){
    Matter.Body.Set(this.bodyObj, 'health', this.value )
    Matter.Body.Set(this.bodyObj, 'group', this.group )
    Matter.Body.Set(this.bodyObj, 'type', this.type )
  }

  character( x, y, h, w, params={} ){
    const params = this.getParams(this.group)
    this.bodyObj = Matter.Bodies.rectangle(x, y, h, w, params);
    this.setParameters()
  }

  projectile(x, y, r, params={}){
    const params = this.getParams(this.group)
    this.bodyObj = Matter.Bodies.circle(x, y, r, params);
    this.setParameters()
    this.setFriction()
  }

  setFriction(){
    this.bodyObj.friction = 0.05;
    this.bodyObj.frictionAir = 0.0005;
    this.bodyObj.restitution = 0.9;
  }

  setVelocity( x, y ){
    Matter.Body.setVelocity( this.bodyObj, {x: x, y: y})
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
