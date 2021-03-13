

import Matter from "matter-js";
import matterCharacter from '../Characters/matterCharacter'

export class cell{

  constructor( props ){

    // default defintions
    this.valid = true
    this.occupied = false

    this.cellVspacer = 0
    this.cellHspacer = 0

    const keys = Object.keys(props)
    if( keys.includes('position') ) this.position = props.position
    if( keys.includes('offset') ) this.offset = props.offset
    if( keys.includes('height') ) this.height = props.height
    if( keys.includes('width') ) this.width = props.width
    if( keys.includes('valid') ) this.valid = props.valid
    if( keys.includes('vspacer') ) this.vspacer = props.vspacer
    if( keys.includes('hspacer') ) this.hspacer = props.hspacer

  }

  get position(){ return this.cellPosition }
  set position(value){ this.cellPosition = value}

  get offset(){ return this.cellOffset }
  set offset(value){ this.cellOffset = value}

  get height(){ return this.cellHeight }
  set height(value){ this.cellHeight = value}

  get width(){ return this.cellWidth }
  set width(value){ this.cellWidth = value}

  get vspacer(){ return this.cellVspacer }
  set vspacer(value){ this.cellVspacer = value}

  get hspacer(){ return this.cellHspacer }
  set hspacer(value){ this.cellHspacer = value}

  // creates teh cell body object and adds it to the world
  addToWorld(engine){

    Matter.World.add(engine.world, [this.createBody()]);
  }

  // returns a static MatterJS body representing the cell
  createBody(){

    if( this.occupied === true ) return undefined
    if( this.valid === false ) return undefined

    const width = this.cellWidth + this.cellHspacer
    const height = this.cellHeight + this.cellVspacer

    this.body = Matter.Bodies.rectangle(
      this.cellPosition[0]*width + width/2 + this.cellOffset[0],
      this.cellPosition[1]*height + height/2  + this.cellOffset[1],
      this.cellWidth,
      this.cellHeight,
      {
        isStatic: true,
        inertia: Infinity,
        collisionFilter: {
            category: 0x0001,
            mask: 0x0001
        },
        render: {
            strokeStyle: 'green',
            fillStyle: 'transparent',
            lineWidth: 2
        }
       }
    )

    this.composite = Matter.Composite.create()
    Matter.Composite.add(this.composite, this.body)

    return this.composite
  }

  /// create a character that resides within the middle o fthe specified cell
  addCharacter( charType ){

    if( this.occupied === true ) return undefined
    if( this.valid === false ) return undefined
    //
    // //TODO: Check the position of the click against the board cellPosition
    // if( (Math.floor(position.x / this.cellWidth) !== this.cellPosition[0]) |
    //     (Math.floor(position.y / this.cellHeight) !== this.cellPosition[1]) ){
    //   return undefined
    // }
    //
    // const x = this.cellPosition[0] * this.cellWidth + (this.cellWidth/2)
    // const y = this.cellPosition[1] * this.cellHeight + (this.cellHeight/2)
    const health = 3
    const team = 1

    //TODO: Create a character in the middle of teh cell
    var charObj = new matterCharacter(
      this.body.position.x,
      this.body.position.y,
      health,
      team
    )

    charObj.setProjectiles(1, 2)

    Matter.Composite.add(this.composite, charObj.body )
    Matter.Composites.chain(this.composite, 0, 0, 0, 0, { stiffness: 1, length: 0 });

    this.occupied = true

    return charObj
  }

  isSelected( body ){

  }

  // all the body to move and track the original position
  startMotion(){
    Matter.Body.setStatic(this.body, false)
    this.position = {...this.body.position,...{}}
  }

  inMotion(){
    if( this.body.isStatic === false ){
      Matter.Body.setPosition(this.body, {x:this.position.x, y:this.body.position.y})
      Matter.Body.setVelocity(this.body, {x: 0, y: 0 })
    }
  }

  // stop the body motion by forcing the body to be static
  stopMotion(){
    Matter.Body.setStatic(this.body, true)
  }
}


export default cell
