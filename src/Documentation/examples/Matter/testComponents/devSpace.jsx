
import Matter from "matter-js";
// adds a static world
export default function devSpace( ref ){

  var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;


  var engine = Engine.create({});
  engine.world.gravity.y = 0;

  const HEIGHT = 400
  const WIDTH = 600
  
  var render = Render.create({
    element: ref,
    engine: engine,
    options: {
      width: WIDTH,
      height: HEIGHT,
      wireframes: false
    }
  });

  World.add(engine.world, [
    // walls
    Bodies.rectangle(WIDTH/2, 0, WIDTH, 50, { isStatic: true }),
    Bodies.rectangle(WIDTH/2, HEIGHT, WIDTH, 50, { isStatic: true }),
    Bodies.rectangle(0, HEIGHT/2, 50, HEIGHT, { isStatic: true }),
    Bodies.rectangle(WIDTH, HEIGHT/2, 50, HEIGHT, { isStatic: true })
  ]);

  return {
    engine: engine,
    render: render
  }

}
