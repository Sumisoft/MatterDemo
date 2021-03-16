

import Matter from "matter-js";
import enemy from '../Characters/enemies'

export class enemyManagement {

  constructor( props ){
    // default defintions
    //
    this.characters = []
    this.padding = [0,0,0,0]

    this.level = 1

    const keys = Object.keys(props)
    if( keys.includes('positions') ) this.positions = props.positions
    if( keys.includes('height') ) this.height = props.height
    if( keys.includes('width') ) this.width = props.width

    // populate the board parameters based on the provided constants
    if( keys.includes('constants') ) this.constants = props.constants

  }

  get positions(){ return this.boardPositions }
  set positions(value){ this.boardPositions = value}

  get height(){ return this.boardHeight }
  set height(value){
    this.boardHeight = value - this.padding[0] - this.padding[2]
    this.cellHeight = this.boardHeight/this.boardPositions[1]
  }

  get width(){ return this.boardWidth }
  set width(value){
    this.boardWidth = value - this.padding[1] - this.padding[3]
    this.cellWidth = (this.boardWidth)/this.boardPositions[0]
  }


  set constants( value ){

    this.padding = [
      value.paddingTop,
      value.paddingLeft,
      value.paddingBottom,
      value.paddingRight,
    ]

    this.positions = [
      value.cellsH,
      value.cellsV,
    ]

    this.width = value.width
    this.height = value.height

    this.level = value.level
  }


  // create a body for each cell and adds it to the work
  addToWorld( props ){

    var row = props.row
    if( row === undefined ) row = Math.floor(Math.random() * this.positions[1])

    console.log( '----', this)
    var charObj = new enemy({
      ...props,
      ...{
        x: 400,
        y: (row * this.cellHeight) + this.cellHeight/2 + this.padding[1],
        width: this.cellWidth,
        height: this.cellHeight,
        level: this.level
      }
    })

    var body = charObj.add()

    Matter.World.add(props.engine.world, body )

    this.characters.push(charObj)

  }


  // refreshs the cell content. This is responsible for updating
  // the projectiles and performing garbage collection
  refresh( engine ){

    const props = {
      engine: engine,
      boardWidth: this.boardWidth,
      boardHeight: this.boardHeight,
    }

    this.characters
      .forEach( r => r.refresh(props) ) // garbage collect each cell
    // console.log( this.cells)

  }




}


export default enemyManagement
