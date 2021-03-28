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
      Render = Matter.Render,
      World = Matter.World,
      Mouse = Matter.Mouse,
      Events = Matter.Events,
      MouseConstraint = Matter.MouseConstraint;


    var constants = new Constants()

    var worldParameter = world({
      ref: this.refs.scene,
      constants: constants
    })

    var engine = worldParameter.engine
    var render = worldParameter.render


    var gameBoard = new board({constants: constants})
    gameBoard.createBoard()
    gameBoard.addToWorld(engine)


    var targets = []

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

    World.add(engine.world, mouseConstraint);

    Matter.Events.on(mouseConstraint, "mousedown", function(event) {

      const cell = gameBoard.selectedCell( event.source.body )

      // when the cell is valid and unoccupied, add a character
      if( cell.valid ){
        const char = cell.cell.addCharacter(1)
        targets.push( char )
      }
      // cell.addCharacter()
      // var mouse = mouseConstraint.mouse,
      //     constraint = mouseConstraint.constraint
      //
      // if (mouse.button === 0) {
      //   var t = new matterCharacter(
      //     constraint.pointA.x,
      //     constraint.pointA.y,
      //     3,
      //     1)
      //
      //   t.setProjectiles(1, 2)
      //
      //   World.add(engine.world, t.body);
      //
      //
      // }
    });

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
 export default Scene;
