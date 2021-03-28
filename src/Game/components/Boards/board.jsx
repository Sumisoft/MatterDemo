

import Matter from "matter-js";
import cell from './cell'
import enemy from '../Characters/enemies'

export class board{

  constructor( props ){

    // default defintions
    this.enemies = []
    this.board = []
    this.cells = []
    this.spacers = []
    this.padding = [0,0,0,0]
    this.constants = {}

    this.hSpacerWidth = 0
    this.hSpacerHeight = props.height
    this.vSpacerWidth = props.width
    this.vSpacerHeight = 0

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

    const spacerBuffer = (this.boardPositions[0]+1) * this.hSpacerWidth
    this.cellWidth = (this.boardWidth - spacerBuffer)/this.boardPositions[0]
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


  addHero(props){
    this.board[props.col][props.row].addHero(
      props.heroType,
      props.level,
      props.engine)
  }

  addEnemy(props){

    var enemyObj = new enemy()
    enemyObj.add({
      ...props,
      ...{
        x : 200,
        y : props.row*this.cellHeight + this.cellHeight/2  + this.padding[0],
        width: this.cellWidth/2,
        height: this.cellHeight,
      }
    })
    this.enemies.push(enemyObj)
  }


  // refreshs the cell content. This is responsible for updating
  // the projectiles and performing garbage collection
  refresh( engine ){

    const props = {
      engine: engine,
      boardWidth: this.boardWidth,
      boardHeight: this.boardHeight,
    }

    this.cells
      .filter(r => r.occupied === true) //select only occupied cells
      .forEach( r => r.hero.refresh(props) ) // garbage collect each cell
    // console.log( this.cells)


    this.enemies.forEach( r => r.refresh(props) ) // garbage collect each cell
  }




}


export default board
