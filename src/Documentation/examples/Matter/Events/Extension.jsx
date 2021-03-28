import React from "react";
import Matter from "matter-js";

import devSpace from '../testComponents/devSpace'

class Scene extends React.Component {
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
      MouseConstraint = Matter.MouseConstraint;


    var matterComp = devSpace(this.refs.scene)

    var render = matterComp.render
    var engine = matterComp.engine


    var rectA = Bodies.rectangle(300, 200, 50, 50, {
      restitution: 0.5,
      isStatic: false,
      inertia: Infinity, });

    Matter.Body.set(rectA, 'health', 2)
    World.add(engine.world, [rectA]);




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
      // console.log(event.source.body)
      // dragBody = event.source.body;

      console.log( event.source.body )
    });


    Engine.run(engine);

    Render.run(render);
  }

  render() {
     return <div ref="scene" />;
   }
 }
 export default Scene;
