import React from "react";
import Matter from "matter-js";


import Constants from 'Game/components/constants'
import world from 'Game/components/Boards/world'
import board from 'Game/components/Boards/board'
import enemyManager from 'Game/components/Game/Enemies'

const enemyScript = [
  {
    row:0,
    charType:1,
    level:1,
    time: 1,
  },
  {
    row:1,
    charType:1,
    level:1,
    time: 2,
  },
  {
    row:2,
    charType:1,
    level:1,
    time: 3,
  },
]


class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

    var constants = new Constants()
    constants.height = 600
    constants.width = 600

    var worldParameter = world({
      ref: this.refs.scene,
      constants: constants
    })

    var engine = worldParameter.engine
    var render = worldParameter.render

    var gameBoard = new board({constants: constants})
    gameBoard.createBoard()
    gameBoard.addToWorld(engine)

    new enemyManager(enemyScript, gameBoard, engine)

    // console.log( gameBoard.board[0][0].hero)
    // var character = gameBoard.board[0][0].hero
    // character.projectile.add(character.character, engine)

    Matter.Events.on(engine, 'afterUpdate', function(event) {
      gameBoard.refresh(engine)
    });


    Matter.Engine.run(engine);

    Matter.Render.run(render);
  }

  render() {
     return <div ref="scene" />;
   }
 }
 export default Scene;
