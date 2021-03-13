
import Matter from "matter-js";


// adds a static world
export default function world( props ){

  var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;


  var engine = Matter.Engine.create({});
  engine.world.gravity.y = 0;

  const HEIGHT = props.constants.height
  const WIDTH = props.constants.width

  console.log( 'props', props.constants )
  var render = Render.create({
    element: props.ref,
    engine: engine,
    options: {
      width: WIDTH,
      height: HEIGHT,
      wireframes: false
    }
  });

  World.add(engine.world, [
    // walls
    Bodies.rectangle(WIDTH/2, -20, WIDTH, 50, { isStatic: true }),
    Bodies.rectangle(WIDTH/2, HEIGHT+20, WIDTH, 50, { isStatic: true }),
    Bodies.rectangle(-20, HEIGHT/2, 50, HEIGHT, { isStatic: true }),
    Bodies.rectangle(WIDTH+20, HEIGHT/2, 50, HEIGHT, { isStatic: true })
  ]);

  return {
    engine: engine,
    render: render
  }

}
