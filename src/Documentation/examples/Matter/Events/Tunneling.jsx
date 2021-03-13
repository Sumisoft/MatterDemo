import React from "react";
import Matter from "matter-js";

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
      MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create({});
    engine.world.gravity.y = 0;


    var render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: 600,
        height: 600,
        wireframes: false
      }
    });

    World.add(engine.world, [
      // walls
      Bodies.rectangle(300, 100, 600, 50, { isStatic: true }),
      Bodies.rectangle(300, 500, 600, 50, { isStatic: true }),
      Bodies.rectangle(100, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(500, 300, 50, 600, { isStatic: true })
    ]);


    var rectA = Bodies.rectangle(310, 250, 50, 50, { restitution: 0.5 });
    var ballB = Bodies.rectangle(200, 200, 50, 50, { restitution: 0.5 });
    // var ballB = Bodies.circle(200, 250, 50, { restitution: 0.5 });
    World.add(engine.world, [rectA, ballB]);

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

    var dragBody

    Matter.Events.on(mouseConstraint, "mousedown", function(event) {
      // console.log(event.source.body)
      console.log('mouse down')
      dragBody = event.source.body;
      dragBody.isStatic = false
    });

    Matter.Events.on(mouseConstraint, "mouseup", function(event) {
      console.log('mouse up')

      dragBody.isStatic = false
      Body.translate(dragBody, {
           x: 20,
           y: 0})
       Matter.Body.setVelocity(dragBody, {x: 0, y: 0 })

    });

      // "lint": "eslint src/**/*.js src/**/*.jsx",
      // "lint:fix": "eslint --fix src/**/*.js src/**/*.jsx"
        // "lint:fix": "./node_modules/.bin/eslint --fix src --ext .jsx,.js"

    Events.on(engine, 'collisionStart', function(event) {
      console.log( 'this is the dragging body', dragBody.position)
     //  var pairs = event.pairs;
     //  console.log( pairs)
     //  if (dragBody != null) {
     //     if (dragBody.velocity.x > 25.0) {
     //         Matter.Body.setVelocity(dragBody, {x: 25, y: dragBody.velocity.y });
     //     }
     //     if (dragBody.velocity.y > 25.0) {
     //         Matter.Body.setVelocity(dragBody, {x: dragBody.velocity.x, y: 25 });
     //     }
     //     if (dragBody.positionImpulse.x > 25.0) {
     //         dragBody.positionImpulse.x = 25.0;
     //     }
     //     if (dragBody.positionImpulse.y > 25.0) {
     //         dragBody.positionImpulse.y = 25.0;
     //     }
     // }
     //
     //  pairs.forEach(({ bodyA, bodyB }) => {
     //    console.log( bodyA.position, bodyB.position)
     //
     //    Body.translate(bodyB, {
     //      x: Math.abs(bodyB.position.x - bodyA.position.x),
     //      y: bodyB.position.x})
     // });
     //
     // Matter.Body.setVelocity(dragBody, {x: 0, y: 0 })
     // dragBody.isStatic = true

    })

    Events.on(engine, 'collisionActive', function(event) {
      Body.translate(dragBody, {
           x: 20,
           y: 0})
       Matter.Body.setVelocity(dragBody, {x: 0, y: 0 })
      // console.log( 'collision active', dragBody.velocity)
      //
      // Body.translate(dragBody, {x:0, y: 0})
      // if (dragBody.velocity.x > 5.0) {
      //     Matter.Body.setVelocity(dragBody, {x: 5, y: dragBody.velocity.y });
      // }
      // if (dragBody.velocity.y > 5.0) {
      //     Matter.Body.setVelocity(dragBody, {x: dragBody.velocity.x, y: 5 });
      // }
      // if (dragBody.positionImpulse.x > 5.0) {
      //     dragBody.positionImpulse.x = 5.0;
      // }
      // if (dragBody.positionImpulse.y > 5.0) {
      //     dragBody.positionImpulse.y = 5.0;
      // }

    })




    Engine.run(engine);

    Render.run(render);
  }

  render() {
     return <div ref="scene" />;
   }
 }
 export default Scene;
