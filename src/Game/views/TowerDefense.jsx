
import React from 'react'


import SelectionMenu from 'Game/components/Game/SelectionMenu/React'
import Board from 'Game/components/Game/Board'


export default class TowerDefense extends React.Component{

  constructor( props ){
    super(props)
    this.state = {
      points: 50,
      selected: undefined,
      width: 800,
      height: 600,
    }

    this.ref = React.createRef();
  }

  componentDidMount() {
    // extract the height and width of the window
    this.setState({
      width: this.ref.current.clientWidth,
      height: this.ref.current.clientHeight,
    })
  }

  render(){

    console.log( this.state )
    return(
      <div ref={this.ref}>
      this is the game

        <SelectionMenu
          {...this.props}
          {...this.state}
          callback = {(val) => this.setState({selected: val})} 
          />
        <Board
          {...this.props}
          height = {this.state.width/2}
          width = {this.state.width}
          />
      </div>
    )
  }
}
