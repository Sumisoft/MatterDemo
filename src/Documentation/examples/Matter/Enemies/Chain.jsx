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

    var engine = Engine.create({
      // positionIterations: 20
    });
    engine.world.gravity.y = 0;

    var render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: 900,
        height: 600,
        wireframes: false
      }
    });

    World.add(engine.world, [
      // walls
      Bodies.rectangle(200, 600, 600, 50, { isStatic: true }),
      // Bodies.rectangle(200, 0, 600, 50, { isStatic: false }),
      // Bodies.rectangle(500, 300, 50, 600, { isStatic: false }),
      // Bodies.rectangle(0, 300, 50, 600, { isStatic: false })
    ]);


    this.addObjects(engine)
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
    //   World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
    // });

    Engine.run(engine);

    Render.run(render);
  }


  addObjects( engine ){
    var Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // add bodies
    var group = Body.nextGroup(true);


    // group = Body.nextGroup(true);
    var head = Bodies.circle(200, 50, 30, { collisionFilter: { group: group }, chamfer: 5 })

    var ropeC = Composites.stack(200, 50, 13, 1, 10, 10, function(x, y) {
        return Bodies.rectangle(x - 20, y, 50, 20, { collisionFilter: { group: group }, chamfer: 5 });
    });

    Composite.add(ropeC, head )
    Composites.chain(ropeC, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });

    Matter.Events.on(engine, 'beforeUpdate', function(event) {
          // console.log( time)
          Body.translate(head, {x:2, y: 0})
          // Body.translate(rectA.body, {x:0.2, y: 0})
          // Composite.translate(rectA, {
          //     x: Math.sin(time * 0.001 * 2,
          //     y: 0
          // });


      });

    World.add(engine.world, [
        // ropeA,
        // ropeB,
        ropeC,
        Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true })
    ]);
  }


  render() {
     return <div ref="scene" />;
   }
 }
 export default Scene;
