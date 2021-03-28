import React from "react";
import Matter from "matter-js";

import cell from '../../../../Game/components/Boards/cell'
import devSpace from '../testComponents/devSpace'


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


    var matterComp = devSpace(this.refs.scene)

    var render = matterComp.render
    var engine = matterComp.engine

    var cellObj = new cell({
      position: [4,4],
      height: 50,
      width: 50,
      valid: true
    })

    cellObj.addToWorld(engine)

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


    var addCharacter = false

    Matter.Events.on(mouseConstraint, "mousedown", function(event) {
      console.log( 'mousedown', event, event.which)
      if( addCharacter === false) cellObj.startMotion()

      if( addCharacter ) cellObj.addCharacter ()

    });

    Matter.Events.on(mouseConstraint, "mouseup", function(event) {
      if( addCharacter === false) cellObj.stopMotion()
    });

    Events.on(engine, 'afterUpdate', function(event) {
        cellObj.inMotion()

    });


    window.addEventListener('keydown', function (e) { addCharacter = true})
    window.addEventListener('keyup', function (e) { addCharacter = false})


    Engine.run(engine);

    Render.run(render);
  }

  render() {
     return <div ref="scene" />;
   }
 }
 export default BoardTest;
