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
      Body = Matter.Body,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      Events = Matter.Events,
      Composite = Matter.Composite,
      Composites = Matter.Composites,
      MouseConstraint = Matter.MouseConstraint;


    var matterComp = devSpace(this.refs.scene)

    var render = matterComp.render
    var engine = matterComp.engine


    var rectA = Bodies.rectangle(300, 200, 50, 50, {
      restitution: 0.5,
      isStatic: true,
      inertia: Infinity, });
    World.add(engine.world, [rectA]);

    var counter = -1
    var dragBody
    var position







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

    // World.setBounds(300, 300, 1800, 1800, 15);


    Matter.Events.on(mouseConstraint, "mousedown", function(event) {
      // console.log(event.source.body)
      dragBody = event.source.body;

      Matter.Body.setStatic(dragBody, false)
      position = {...event.source.body.position,...{}}
      // console.log( dragBody)
      // console.log('mouse down', position)
      // dragBody.isStatic = false
    });

    Events.on(engine, 'afterUpdate', function(event) {
          var time = engine.timing.timestamp;
          // console.log( time)
          //
          if( dragBody !== undefined ){
            Matter.Body.setPosition(dragBody, {x:dragBody.position.x, y:position.y})
            Matter.Body.setVelocity(dragBody, {x: 0, y: 0 })
            // Matter.Body.setPosition(dragBody, [300, 200])
            // Matter.Body.setVelocity(dragBody, {x: 0, y: 0 })
            // Body.translate(dragBody, {x:0, y: -Math.abs(dragBody.position.y - position.y) })

          }
          // Body.translate(rectA.body, {x:0.2, y: 0})
          // Composite.translate(rectA, {
          //     x: Math.sin(time * 0.001 * 2,
          //     y: 0
          // });


      });

    Matter.Events.on(mouseConstraint, "mouseup", function(event) {
      console.log('mouse up')

      // Matter.Body.setPosition(dragBody, {x:100, y:200})
      // Matter.Body.setPosition(dragBody, {x:dragBody.position.x, y:position.y})
      // Matter.Body.setVelocity(dragBody, {x: 0, y: 0 })
      //
      Matter.Body.setStatic(dragBody, true)
      dragBody = undefined
      //
      // dragBody.isStatic = false
      // Body.translate(dragBody, {
      //      x: 20,
      //      y: 0})
      //  Matter.Body.setVelocity(dragBody, {x: 0, y: 0 })
      //
    });



    Engine.run(engine);

    Render.run(render);
  }

  render() {
     return <div ref="scene" />;
   }
 }
 export default Scene;
