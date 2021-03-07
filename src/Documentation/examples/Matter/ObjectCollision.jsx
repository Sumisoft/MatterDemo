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

    World.add(engine.world, [
      // walls
      Bodies.rectangle(300, 300, 600, 50, { isStatic: true }),
      // Bodies.rectangle(200, 0, 600, 50, { isStatic: false }),
      // Bodies.rectangle(500, 300, 50, 600, { isStatic: false }),
      // Bodies.rectangle(0, 300, 50, 600, { isStatic: false })
    ]);

    var projectiles = []
    var targets = []


    for( var i=0; i < 3; i++ ){
      var t = new matterObj(2)
      t.rectangle(210 + 60*i, 250, 30, 50)
      targets.push( t )
    }


    var rectA = Bodies.rectangle(310, 250, 30, 50, { restitution: 0.5 });
    var ballB = Bodies.circle(110, 250, 10, { restitution: 0.5 });
    World.add(engine.world, targets.map(r => r.body) );



    Events.on(engine, 'collisionStart', function(event) {
      var pairs = event.pairs;
      pairs.forEach(({ bodyA, bodyB }) => {
        // var pair = pairs[i];
        var index
        var projFlag = false

        const projArray = projectiles.map(r => r.body)
        index = projArray.indexOf(bodyB)
        if( index >= 0){
          if( projectiles[index].collision(engine) ){
            delete projectiles[index]
          }
          projFlag = true
        }

        const targetArray = targets.map(r => r.body)
        index = targetArray.indexOf(bodyA)
        if( (index >= 0) & (projFlag === true)){
          if( targets[index].collision(engine) ){
            delete targets[index]
          }
        }


        // console.log( projArray.includes(bodyA), projArray.includes(bodyB), projArray.indexOf(bodyB))

        if((bodyA === rectA)&(bodyB === ballB)){
          Matter.World.remove(engine.world, ballB);
        }

     });
    })


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
      var t = new matterObj(1)
      t.circle(60, 250, 10)
      t.setVelocity(5, 0)
      projectiles.push( t )

      World.add(engine.world, t.body);
    });


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
