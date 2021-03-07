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
      Composite = Matter.Composite,
      Composites = Matter.Composites,
      MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create({});
    engine.world.gravity.y = 0;


    var render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: 600,
        height: 300,
        wireframes: false
      }
    });

    var rectA = Bodies.rectangle(310, 250, 30, 50, { restitution: 0.5 });
    var ballB = Bodies.circle(110, 250, 10, { restitution: 0.5 });
    World.add(engine.world, [
      // walls
      Bodies.rectangle(300, 300, 600, 50, { isStatic: true }),
      // Bodies.rectangle(200, 0, 600, 50, { isStatic: false }),
      // Bodies.rectangle(500, 300, 50, 600, { isStatic: false }),
      // Bodies.rectangle(0, 300, 50, 600, { isStatic: false })
    ]);

    World.add(engine.world, [rectA, ballB]);


    console.log( rectA)
    Events.on(engine, 'afterUpdate', function(event) {
          var time = engine.timing.timestamp;
          // console.log( time)
          Body.translate(ballB, {x:2, y: 0})
          // Body.translate(rectA.body, {x:0.2, y: 0})
          // Composite.translate(rectA, {
          //     x: Math.sin(time * 0.001 * 2,
          //     y: 0
          // });


      });

    Events.on(engine, 'collisionStart', function(event) {
      var pairs = event.pairs;
      pairs.forEach(({ bodyA, bodyB }) => {
        // var pair = pairs[i];
        if((bodyA === rectA)&(bodyB === ballB)){
          Matter.World.remove(engine.world, ballB);
        }

     });
    })



    // World.add(engine.world, mouseConstraint);

    // Matter.Events.on(mouseConstraint, "mousedown", function(event) {
    //   World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
    // });

    Engine.run(engine);

    Render.run(render);
  }

  render() {
     return <div ref="scene" />;
   }
 }
 export default Scene;
