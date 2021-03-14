import React from "react";
import Matter from "matter-js";

import matterCharacter from '../../../../Game/components/Characters/matterCharacter'
import Constants from '../../../../Game/components/constants'
import world from '../../../../Game/components/Boards/world'
import board from '../../../../Game/components/Boards/board'

const CONSTANTS = {
  height: 400,
  width: 800,
  cellsVerical: 10,
  cellsHorizontal: 8

}

export default class CharacterPallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      Events = Matter.Events,
      MouseConstraint = Matter.MouseConstraint;


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
    var targets = []



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
