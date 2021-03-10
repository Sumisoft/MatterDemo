

import Matter from "matter-js";
import cell from './cell'

export class board{

  constructor( props ){

    // default defintions
    this.board = []
    this.spacers = []

    this.hSpacerWidth = 5
    this.hSpacerHeight = props.height
    this.vSpacerWidth = props.width
    this.vSpacerHeight = 0

    const keys = Object.keys(props)
    if( keys.includes('positions') ) this.positions = props.positions
    if( keys.includes('height') ) this.height = props.height
    if( keys.includes('width') ) this.width = props.width

  }

  get positions(){ return this.boardPositions }
  set positions(value){ this.boardPositions = value}

  get height(){ return this.boardHeight }
  set height(value){
    this.boardlHeight = value
    this.spacerHeight = value
    this.cellHeight = value/this.boardPositions[1]
  }

  get width(){ return this.boardlWidth }
  set width(value){
    this.boardlWidth = value

    const spacerBuffer = (this.boardPositions[0]+1) * this.hSpacerWidth
    this.cellWidth = (value - spacerBuffer)/this.boardPositions[0]
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
            width: this.cellWidth,
            height: this.cellHeight,
            hspacer: this.hSpacerWidth,
            vspacer: this.vSpacerHeight,
            valid: Math.random() < 0.5
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
  add( engine ){
    // .map(t => t.createBody())
    const bodies = this.board
      .map(r => r.filter(s=>s.valid === true).map(t => t.createBody()) )
      .reduce((pre, cur) => pre.concat(cur));

    Matter.World.add(engine.world, bodies);

    this.addVSpacers(engine)

  }


  isSelected( position ){

  }
}


export default board
