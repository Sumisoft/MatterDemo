
import Matter from "matter-js";


// adds a static world
export default function world( props ){



  var engine = Matter.Engine.create({});
  engine.world.gravity.y = 0;

  const HEIGHT = props.constants.height
  const WIDTH = props.constants.width

  var render = Matter.Render.create({
    element: props.ref,
    engine: engine,
    options: {
      width: WIDTH,
      height: HEIGHT,
      wireframes: false
    }
  });

  Matter.World.add(engine.world, [
    // walls
    Matter.Bodies.rectangle(WIDTH/2, -20, WIDTH, 50, { isStatic: true }),
    Matter.Bodies.rectangle(WIDTH/2, HEIGHT+20, WIDTH, 50, { isStatic: true }),
    Matter.Bodies.rectangle(-20, HEIGHT/2, 50, HEIGHT, { isStatic: true }),
    Matter.Bodies.rectangle(WIDTH+20, HEIGHT/2, 50, HEIGHT, { isStatic: true })
  ]);

  return {
    engine: engine,
    render: render
  }

}
