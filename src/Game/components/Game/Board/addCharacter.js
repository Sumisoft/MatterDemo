
// adds a character to the board
export default function addCharacter(props){
  console.log( 'mousedown', props)

  // add the character only when there are available points
  if( props.selectedChar.cost < props.points ){
    const points = props.points - props.selectedChar.cost

    const cell = props.event.source.body;
    console.log( cell, props )
    props.gameBoard.addHero({
      row:cell.cellPosition.y,
      col:cell.cellPosition.x,
      heroType: props.selectedChar.alias,
      level:1,
      engine:props.engine
    })


    // update the state with the points after character purchase and
    // deselect the selected character
    props.stateCallback({
      points: points,
      selectedChar: undefined
    })
  }

}
