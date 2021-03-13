import React from "react";
import Matter from "matter-js";

import matterCharacter from '../../../../Game/components/Characters/matterCharacter'

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

    var character = new matterCharacter(400, 250, 5, 1)
    character.setProjectiles(1, -2)
    targets.push( character )


    for( var i=0; i < 2; i++ ){
      var t = new matterCharacter(110 + 60*i, 250, 3, 0)
      t.setProjectiles(2, 2)
      targets.push( t )
    }


    World.add(engine.world, targets.map(r => r.body) );



    Events.on(engine, 'collisionStart', function(event) {

      var pairs = event.pairs;
      pairs.forEach(({ bodyA, bodyB }) => {

        targets.forEach((character) => {
          // var pair = pairs[i];
          var index
          // var projFlag = character.projCollision(bodyA, bodyB, engine)

          if( character.bodyCollision(bodyA, bodyB, engine) ){
            index = targets.indexOf(character)
            delete targets[index]
          }
          // const targetArray = targets.map(r => r.body)
          // if( (index >= 0) & (projFlag === true)){
          //   if( targets[index].collision(engine) ){
          //     delete targets[index]
          //   }
          // }
          //
        })


     });
    })



    Events.on(engine, 'afterUpdate', function(event) {
      targets.forEach((character) => character.update(engine))
    });


    Engine.run(engine);

    Render.run(render);
  }

  render() {
     return <div ref="scene" />;
   }
 }
 export default Scene;
