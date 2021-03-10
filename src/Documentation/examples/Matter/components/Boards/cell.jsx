

import Matter from "matter-js";
import matterCharacter from '../matterCharacter'

export class cell{

  constructor( props ){

    // default defintions
    this.valid = true
    this.occupied = false

    const keys = Object.keys(props)
    if( keys.includes('position') ) this.position = props.position
    if( keys.includes('height') ) this.height = props.height
    if( keys.includes('width') ) this.width = props.width
    if( keys.includes('valid') ) this.valid = props.valid
    if( keys.includes('vspacer') ) this.vspacer = props.vspacer
    if( keys.includes('hspacer') ) this.hspacer = props.hspacer

  }

  get position(){ return this.cellPosition }
  set position(value){ this.cellPosition = value}

  get height(){ return this.cellHeight }
  set height(value){ this.cellHeight = value}

  get width(){ return this.cellWidth }
  set width(value){ this.cellWidth = value}

  get vspacer(){ return this.cellVspacer }
  set vspacer(value){ this.cellVspacer = value}

  get hspacer(){ return this.cellHspacer }
  set hspacer(value){ this.cellHspacer = value}

  // returns a static MatterJS body representing the cell
  createBody(){

    if( this.occupied === true ) return undefined
    if( this.valid === false ) return undefined

    const width = this.cellWidth + this.cellHspacer
    const height = this.cellHeight + this.cellVspacer
    return Matter.Bodies.rectangle(
      this.cellPosition[0]*width + width/2,
      this.cellPosition[1]*height + height/2,
      this.cellWidth,
      this.cellHeight,
      {
        isStatic: true,
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
  }

  /// create a character that resides within the middle o fthe specified cell
  createCharacter( position ){

    if( this.occupied === true ) return undefined
    if( this.valid === false ) return undefined

    //TODO: Check the position of the click against the board cellPosition
    if( (Math.floor(position.x / this.cellWidth) !== this.cellPosition[0]) |
        (Math.floor(position.y / this.cellHeight) !== this.cellPosition[1]) ){
      return undefined
    }

    const x = this.cellPosition[0] * this.cellWidth + (this.cellWidth/2)
    const y = this.cellPosition[1] * this.cellHeight + (this.cellHeight/2)

    //TODO: Create a character in the middle of teh cell
    var charObj = new matterCharacter(x, y, 3, 1)
    charObj.setProjectiles(1, 2)

    return charObj
  }

  isSelected( position ){

  }
}


export default cell
