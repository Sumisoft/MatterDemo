import React from "react";
import Matter from "matter-js";


import Constants from '../../constants'
import world from '../../Boards/world'
import board from '../../Boards/board'
import enemyManager from '../Enemies'
import collision from '../collision'

import addCharacter from './addCharacter'

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

    // add enemies based on the provided script
    if( this.props.enemyScript !== undefined ){
      new enemyManager(this.props.enemyScript, gameBoard, engine)
    }


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

    // Matter.Events.on(mouseConstraint, "mousedown", function(event) {
    //   console.log( 'what are the props...', this.props, this.state)
    //   addCharacter(event, gameBoard, engine, this.props)
    // });
    Matter.Events.on(mouseConstraint, "mousedown", this.mouseDown.bind(this))
    Matter.Events.on(engine, 'collisionStart', this.collisionStart.bind(this))


    Matter.Engine.run(engine);

    Matter.Render.run(render);

    this.setState({engine: engine, gameBoard: gameBoard})
  }

  // routines performed when the mouse button is pressed
  mouseDown( event ){
    console.log( 'mousedown', this.props, this.state)
    if(this.props.selectedChar !== undefined ) addCharacter({...this.props, ...this.state, ...{event:event}})
  }

  // routines performed when a collision occurs
  collisionStart( event ){
    var pairs = event.pairs;
    pairs.forEach(({ bodyA, bodyB }) => {
      console.log(bodyA.health, bodyB.health)
      new collision( bodyA, bodyB, this.state.engine )

   });
  }

  render() {
     return <div ref="scene" />;
   }
 }
