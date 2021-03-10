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

    var counter = -1
    var dragBody

    Matter.Events.on(mouseConstraint, "mousedown", function(event) {
      // console.log(event.source.body)
      dragBody = event.source.body;
    });


    Events.on(engine, 'collisionStart', function(event) {
      console.log( 'this is the dragging body', dragBody)
      var pairs = event.pairs;
      if (dragBody != null) {
         if (dragBody.velocity.x > 25.0) {
             Matter.Body.setVelocity(dragBody, {x: 25, y: dragBody.velocity.y });
         }
         if (dragBody.velocity.y > 25.0) {
             Matter.Body.setVelocity(dragBody, {x: dragBody.velocity.x, y: 25 });
         }
         if (dragBody.positionImpulse.x > 25.0) {
             dragBody.positionImpulse.x = 25.0;
         }
         if (dragBody.positionImpulse.y > 25.0) {
             dragBody.positionImpulse.y = 25.0;
         }
     }

      pairs.forEach(({ bodyA, bodyB }) => {
        console.log( bodyB)

        Body.translate(bodyB, {x:0, y: 0})
     });
    })

    Events.on(engine, 'collisionActive', function(event) {
      console.log( 'collision active', dragBody)

    })




    Engine.run(engine);

    Render.run(render);
  }

  render() {
     return <div ref="scene" />;
   }
 }
 export default Scene;




class matterObj{

  constructor( health ){
    this.body = undefined
    this.health = health
  }

  rectangle( x, y, h, w ){
    this.body = Matter.Bodies.rectangle(x, y, h, w, { restitution: 0.5 });
  }

  circle( x, y, r ){
    this.body = Matter.Bodies.circle(x, y, r, { restitution: 0.5 });

    this.body.friction = 0.05;
    this.body.frictionAir = 0.0005;
    this.body.restitution = 0.9;
  }

  setVelocity( x, y ){
    Matter.Body.setVelocity( this.body, {x: 5, y: 0})
  }

  isCollision( bodyA, bodyB){
    if((bodyA === this.body)|(bodyB === this.body)) return true
    return false
  }

  collision( engine ){

    this.health = this.health - 1

    if(this.health === 0){
      Matter.World.remove(engine.world, this.body);
      return true
    }

    return false
  }

}
