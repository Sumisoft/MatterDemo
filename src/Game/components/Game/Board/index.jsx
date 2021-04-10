import React from "react";
import Matter from "matter-js";


import Constants from '../../constants'
import world from '../../Boards/world'
import board from '../../Boards/board'

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

    var constants = new Constants()
    constants.height = (this.props.height===undefined) ? 600 : this.props.height
    constants.width = (this.props.width===undefined) ? 600 : this.props.width

    var worldParameter = world({
      ref: this.refs.scene,
      constants: constants
    })

    var engine = worldParameter.engine
    var render = worldParameter.render

    var gameBoard = new board({constants: constants})
    gameBoard.createBoard()
    gameBoard.addToWorld(engine)

    // console.log( gameBoard.board[0][0].hero)
    // var character = gameBoard.board[0][0].hero
    // character.projectile.add(character.character, engine)

    var mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: Matter.Mouse.create(render.canvas),
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });


    Matter.Events.on(engine, 'afterUpdate', function(event) {
      gameBoard.refresh(engine)
    });

    Matter.Events.on(mouseConstraint, "mousedown", function(event) {
      this.addCharacter(event, gameBoard, engine)
    });

    Matter.Engine.run(engine);

    Matter.Render.run(render);
  }

  addCharacter(event, gameBoard, engine){
    const cell = event.source.body;
    console.log( cell )
    gameBoard.addHero({
      row:cell.cellPosition.y,
      col:cell.cellPosition.x,
      heroType:1,
      level:1,
      engine:engine
    })

  }


  render() {
     return <div ref="scene" />;
   }
 }
