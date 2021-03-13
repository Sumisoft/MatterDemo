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
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
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


    var rectA = Bodies.rectangle(310, 250, 30, 50, { restitution: 0.5 });
    var ballB = Bodies.circle(200, 250, 50, { restitution: 0.5 });
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

    // World.setBounds(300, 300, 1800, 1800, 15);


    Engine.run(engine);

    Render.run(render);
  }

  render() {
     return <div ref="scene" />;
   }
 }
 export default Scene;
