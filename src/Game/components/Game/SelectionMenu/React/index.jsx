
import React from 'react'
import { Segment, Header } from 'semantic-ui-react'

import MenuItem from './MenuItem'

// selection menu driven by a json object containing all available chracters and costs
export default function SelectionMenu(props){

  // default the callback to set the local state. Do this and
  // also perform the callback when provided from the parent
  var callback = (val) => console.log('character selected with no callback', val)
  if( props.stateCallback !== undefined ){
    callback = (val) => {
      props.stateCallback({selectedChar:val})
    }
  }

  var segments = []
  props.characterJson.forEach( (r, idx) => {
    segments.push(
      <MenuItem
        character = {r}
        selected = {(props.selectedChar !== undefined) ? (r.name === props.selectedChar.name) : false}
        callback = {callback}
        col={idx}/>
    )
  })

  return(
    <Segment.Group horizontal>
      <Segment style={{textAlign: 'center'}} >
        <Header as='h3' style={{margin: '5px'}}>{props.points}</Header>
        <Header as='h3' style={{margin: '5px'}}>Points</Header>
      </Segment>

      {segments}
    </Segment.Group>
  )

}
