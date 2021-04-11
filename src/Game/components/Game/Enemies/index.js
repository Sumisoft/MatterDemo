

// enemy management system. Based on the content of the provided json object
// determines the rendering of the enemy objects. This provide maximum flexibility
// to create dynamic levels
//
export default class enemyManager{

  constructor( enemyScript, gameBoard, engine ){

    this.enemyScript = enemyScript
    this.gameBoard = gameBoard
    this.engine = engine
    this.time = null

    this.init()
  }

  init(){

    // sort the enemies in chronological order based on execution time
    this.enemyScript = this.enemyScript.sort((a, b) => a.time - b.time);
    this.time = this.enemyScript[0].time

    // set the timer to trigger on the first enemy event
    this.updateTimer(this.time)
  }

  update(){

    // select all characters to be added at a single time
    const enemies = this.enemyScript.filter(r => r.time === this.time)

    // add each character to the board
    enemies.forEach( r => {
      this.gameBoard.addEnemy({
        row: r.row,
        charType: r.charType,
        level: r.level,
        engine:this.engine
      })
    })

    // set the timer to trigger on the next available character when applicable
    const nextEnemies = this.enemyScript.filter(r => r.time > this.time)
    if( nextEnemies.length > 0 ){
      this.updateTimer(nextEnemies[0].time - this.time)
      this.time = nextEnemies[0].time
    }
  }


  updateTimer(time){
    setTimeout(() => this.update(), time * 1000 );
  }



}
