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
    //
    // gameBoard.addEnemy({
    //   row:0,
    //   charType:2,
    //   level:1,
    //   engine:engine
    // })

    // console.log( gameBoard.board[0][0].hero)
    // var character = gameBoard.board[0][0].hero
    // character.projectile.add(character.character, engine)
    // add mouse control
    var mouse = Matter.Mouse.create(render.canvas),
      mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

    Matter.Events.on(mouseConstraint, "mousedown", function(event) {
      const cell = event.source.body;
      console.log( cell )
      gameBoard.addHero({
        row:cell.cellPosition.y,
        col:cell.cellPosition.x,
        heroType:1,
        level:1,
        engine:engine
      })
    });

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
