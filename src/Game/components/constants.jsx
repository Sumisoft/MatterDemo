
export const CONSTANTS = {
  height: 400,
  width: 800,
  cellsVerical: 10,
  cellsHorizontal: 8,
  CHAR_WIDTH:30,
  CHAR_HEIGHT:50,


}



export default class Constants{

  constructor( props ){

    this.worldHeight = 300
    this.worldWidth = 600

    this.cellsVerical = 8
    this.cellsHorizontal = 10

    this.characterWidth = 30
    this.characterHeight = 30

    this.paddingTop = 20
    this.paddingLeft = 20
    this.paddingBottom = 5
    this.paddingRight = 50
  }

  get height(){ return this.worldHeight }
  set height(val){ this.worldHeight = val}

  get width(){ return this.worldWidth }
  set width(val){ this.worldWidth = val}

  get cellsV(){ return this.cellsVerical }
  set cellsV(val){ this.cellsVerical = val}

  get cellsH(){ return this.cellsHorizontal }
  set cellsH(val){ this.cellsHorizontal = val}

  get charWidth(){ return this.characterWidth }
  set charWidth(val){ this.characterWidth = val}

  get charHeight(){ return this.characterHeight }
  set charHeight(val){ this.characterHeight = val}



}
