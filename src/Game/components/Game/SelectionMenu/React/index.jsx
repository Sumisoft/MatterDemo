
import React from 'react'
import { Segment } from 'semantic-ui-react'

import MenuItem from './MenuItem'

// selection menu driven by a json object containing all available chracters and costs
export default function SelectionMenu(props){

  const [selected, setSelected] = React.useState(props.selected)

  // default the callback to set the local state. Do this and
  // also perform the callback when provided from the parent
  var callback = (val) => setSelected(val)
  if( props.callback !== undefined ){
    callback = (val) => {
      setSelected(val)
      props.callback( val)
    }
  }

  var segments = []
  props.characterJson.forEach( (r, idx) => {
    segments.push(
      <MenuItem
        character = {r}
        selected = {(r.name === selected.name)}
        callback = {callback}
        col={idx}/>
    )
  })

  return(
    <Segment.Group horizontal>
      {segments}
    </Segment.Group>
  )

}
