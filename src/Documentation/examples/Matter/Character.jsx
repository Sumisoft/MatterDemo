import React from "react";
import Matter from "matter-js";

import matterObj from './components/matterObj'
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
      Events = Matter.Events;

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

    var targets = []

    var character = new matterCharacter(60, 250, 5, engine)
    character.setMovement(0.1, 0)
    character.setProjectiles(1, 2)
    targets.push( character )


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
        var projFlag = character.projCollision(bodyA, bodyB, engine)

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


    // // add mouse control
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
    //
    // Matter.Events.on(mouseConstraint, "mousedown", function(event) {
    //   var t = new matterObj(1)
    //   t.circle(60, 250, 10)
    //   t.setVelocity(5, 0)
    //   projectiles.push( t )
    //
    //   World.add(engine.world, t.body);
    // });

    Events.on(engine, 'afterUpdate', function(event) {
        character.update(engine)

    });


    Engine.run(engine);

    Render.run(render);
  }

  render() {
     return <div ref="scene" />;
   }
 }
 export default Scene;


const CHAR_WIDTH = 30
const CHAR_HEIGHT = 50

class matterCharacter extends matterObj{

  constructor( x, y, health, engine){
    super(health)
    this.engine = engine
    this.createdOn = engine.timing.timestamp
    this.updatedOn = engine.timing.timestamp

    this.projectiles = []

    this.movement = {
      speed: 0,
    }

    this.projectile = {
      rate: 0,
      speed: 0,
      maxDistance: 0
    }

    this.rectangle( x, y, CHAR_WIDTH, CHAR_HEIGHT )
  }

  setMovement( speed ){
    this.movement.speed = speed
    Matter.Body.setVelocity( this.body, {x: speed, y: 0})
    this.body.friction = 0.05;
    this.body.frictionAir = 0.0005;
    this.body.restitution = 0.9;
  }

  setProjectiles( rate, speed, maxDistance=undefined ){
    this.projectile = {
      rate: rate,
      speed: speed,
      maxDistance: maxDistance
    }
  }

  /// create a projectile object, add it to the world and
  /// store it into a buffer for future use
  addProjectile(engine){

    var projObj = new matterObj(1)

    const x = this.body.position.x + CHAR_WIDTH
    const y = this.body.position.y
    projObj.circle(x, y, 10)

    projObj.setVelocity(this.projectile.speed, 0)

    this.projectiles.push(projObj)

    Matter.World.add(engine.world, projObj.body);
  }

  // update the world periodically
  update( engine ){
    const timestamp = engine.timing.timestamp
    const lastUpdated = Math.floor((timestamp - this.updatedOn)/1000)
    if( this.projectile.rate > 0 ){
      if( lastUpdated > this.projectile.rate ){
        this.addProjectile(engine)
        this.updatedOn = timestamp
      }
    }
  }

  //
  projCollision(bodyA, bodyB, engine){

    var index
    var projFlag = false

    const projArray = this.projectiles.map(r => r.body)

    index = projArray.indexOf(bodyA)
    if( index >= 0){
      if( this.projectiles[index].collision(engine) ){
        delete this.projectiles[index]
      }
      projFlag = true
    }

    index = projArray.indexOf(bodyB)
    if( index >= 0){
      if( this.projectiles[index].collision(engine) ){
        delete this.projectiles[index]
      }
      projFlag = true
    }

    return projFlag

  }


}

// Matter.Events.on(mouseConstraint, "mousedown", function(event) {
//   var t = new matterObj(1)
//   t.circle(60, 250, 10)
//   t.setVelocity(5, 0)
//   projectiles.push( t )
//
//   World.add(engine.world, t.body);
// });
