import React from "react";
import Matter from "matter-js";

import Constants from '../../../../Game/components/constants'
import world from '../../../../Game/components/Boards/world'
import board from '../../../../Game/components/Boards/board'


export default class CharacterPallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      Events = Matter.Events;


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

    gameBoard.board[0][0].addCharacter(1)
    gameBoard.board[0][1].addCharacter(2)
    gameBoard.board[0][3].addCharacter(3)
    // gameBoard.board[0][3].addCharacter(4)


    Events.on(engine, 'afterUpdate', function(event) {
      gameBoard.refresh(engine)
    });

    Engine.run(engine);

    Render.run(render);
  }

  render() {
     return <div ref="scene" />;
   }
 }
