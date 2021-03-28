import React from "react";
import Matter from "matter-js";


import Constants from 'Game/components/constants'
import world from 'Game/components/Boards/world'
import board from 'Game/components/Boards/board'

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var Engine = Matter.Engine,
      Render = Matter.Render;


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

    gameBoard.addHero({
      row:0,
      col:0,
      heroType:1,
      level:1,
      engine:engine
    })

    console.log( gameBoard.board[0][0].hero)

    // Events.on(engine, 'afterUpdate', function(event) {
    //   gameBoard.refresh(engine)
    // });


    Engine.run(engine);

    Render.run(render);
  }

  render() {
     return <div ref="scene" />;
   }
 }
 export default Scene;
