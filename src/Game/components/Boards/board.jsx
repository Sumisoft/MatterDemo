

import Matter from "matter-js";
import cell from './cell'

export class board{

  constructor( props ){

    // default defintions
    this.board = []
    this.spacers = []
    this.cells = []
    this.padding = [0,0,0,0]

    this.hSpacerWidth = 0
    this.hSpacerHeight = props.height
    this.vSpacerWidth = props.width
    this.vSpacerHeight = 0

    const keys = Object.keys(props)
    if( keys.includes('positions') ) this.positions = props.positions
    if( keys.includes('height') ) this.height = props.height
    if( keys.includes('width') ) this.width = props.width

    // populate the board parameters based on the provided constants
    if( keys.includes('constants') ){
      this.padding = [
        props.constants.paddingTop,
        props.constants.paddingLeft,
        props.constants.paddingBottom,
        props.constants.paddingRight,
      ]

      this.positions = [
        props.constants.cellsH,
        props.constants.cellsV,
      ]

      this.width = props.constants.width
      this.height = props.constants.height
    }

  }

  get positions(){ return this.boardPositions }
  set positions(value){ this.boardPositions = value}

  get height(){ return this.boardHeight }
  set height(value){
    this.boardlHeight = value - this.padding[0] - this.padding[2]
    this.cellHeight = this.boardlHeight/this.boardPositions[1]
  }

  get width(){ return this.boardWidth }
  set width(value){
    this.boardWidth = value - this.padding[1] - this.padding[3]

    const spacerBuffer = (this.boardPositions[0]+1) * this.hSpacerWidth
    this.cellWidth = (this.boardWidth - spacerBuffer)/this.boardPositions[0]
  }

  // creates a matrix containing cell objects
  createBoard(){

    if( this.occupied === true ) return undefined
    if( this.valid === false ) return undefined


    for( var x=0; x < this.boardPositions[0]; x++ ){

      var row = []
      for( var y=0; y < this.boardPositions[1]; y++ ){
          const _cell = new cell({
            position: [x,y],
            offset: [this.padding[0], this.padding[1]],
            width: this.cellWidth,
            height: this.cellHeight,
            hspacer: this.hSpacerWidth,
            vspacer: this.vSpacerHeight,
            valid: true
          })

          row.push( _cell)
      }

      this.board.push( row )
    }

  }

  // adds vertical spacers to allow the objects to move without
  // a vertical shaft
  addVSpacers(engine){

    var vspacers = []
    for( var x=0; x < this.boardPositions[0]+1; x++ ){
      const spacer = Matter.Bodies.rectangle(
        x*(this.cellWidth + this.hSpacerWidth),
        this.hSpacerHeight/2,
        this.hSpacerWidth,
        this.hSpacerHeight,
        {
          isStatic: true,
          collisionFilter: {
            category: 0x0001,
            mask: 0x0001
          },
          render: {
            strokeStyle: 'yellow',
            fillStyle: 'transparent',
            lineWidth: 2
          }
        }
      )


      vspacers.push(spacer)
    }

    Matter.World.add(engine.world, vspacers)

  }

  // create a body for each cell and adds it to the work
  addToWorld( engine ){
    // .map(t => t.createBody())
    this.cells = this.board
      .map(r => r.filter(s=>s.valid === true))
      .reduce((pre, cur) => pre.concat(cur));

    Matter.World.add(engine.world, this.cells.map(t => t.createBody()) )

    this.addVSpacers(engine)

  }

  // returns the selected cell object
  selectedCell( body ){

    // search for the selected cell
    const selected = this.cells.filter(r => r.body === body)

    // return an object containing cell information when it exist
    if( selected.length > 0 ){
      return {
        valid: !selected[0].occupied,
        cell: selected[0]
      }
    }

    // default to invalid for all non-cells
    return {valid: false}
  }

  // returns the cell object containing the Matter Body
  getCell( body ){

  }
}


export default board
