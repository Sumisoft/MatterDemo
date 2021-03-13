import React from "react";
import Matter from "matter-js";

import board from '../../../../Game/components/Boards/board'

import {CONSTANTS} from '../../../../Game/components/constants'

class BoardTest extends React.Component {
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

    var engine = Engine.create({});
    engine.world.gravity.y = 0;


    var render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: CONSTANTS.width,
        height: CONSTANTS.height,
        wireframes: false
      }
    });



    var gameBoard = new board({
      width: CONSTANTS.width,
      height: CONSTANTS.height,
      positions: [CONSTANTS.cellsHorizontal, CONSTANTS.cellsVerical],
    })

    gameBoard.createBoard()
    gameBoard.add(engine)
    console.log( gameBoard )
    // const cellHeight = CONSTANTS.height / CONSTANTS.cellsVerical
    // const cellWidth = CONSTANTS.width / CONSTANTS.cellsHorizontal
    //
    // var grid = []
    // for( var x=0; x < CONSTANTS.cellsHorizontal; x++ ){
    //   for( var y=0; y< CONSTANTS.cellsVerical; y++ ){
    //     grid.push(
    //       Bodies.rectangle(
    //         x*cellWidth + cellWidth/2,
    //         y*cellHeight + cellHeight/2,
    //         cellWidth,
    //         cellHeight,
    //         { isStatic: true,
    //           collisionFilter: {
    //               category: 0x1000,
    //               mask: 0x1000
    //           },
    //          }
    //       )
    //     )
    //   }
    // }
    //
    // World.add(engine.world, grid);

    var targets = []

    // add mouse control
    // var mouse = Mouse.create(render.canvas),
    //   mouseConstraint = MouseConstraint.create(engine, {
    //     mouse: mouse,
    //     constraint: {
    //       stiffness: 0.2,
    //       render: {
    //         visible: false
    //       }
    //     }
    //   });
    //
    // World.add(engine.world, mouseConstraint);


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

    // Matter.Events.on(mouseConstraint, "mousedown", function(event) {
    //   var mouse = mouseConstraint.mouse,
    //       constraint = mouseConstraint.constraint,
    //       body = mouseConstraint.body;
    //
    //   if (mouse.button === 0) {
    //     var t = new matterCharacter(
    //       constraint.pointA.x,
    //       constraint.pointA.y,
    //       3,
    //       1)
    //
    //     t.setProjectiles(1, 2)
    //     targets.push( t )
    //
    //     World.add(engine.world, t.body);
    //
    //
    //   }
    // });

    Events.on(engine, 'afterUpdate', function(event) {
      targets.forEach((character) => character.update(engine))
    });








    Engine.run(engine);

    Render.run(render);
  }

  render() {
     return <div ref="scene" />;
   }
 }
 export default BoardTest;
