
import { Segment, Image, Header } from 'semantic-ui-react'

// returns a menu item for the character selection menu
export default function MenuItem(props){

  var style = {
    textAlign: 'center',
    padding: '5px'
  }

  if( props.selected === true ) style['backgroundColor'] = 'yellow'

  return(
    <Segment
      style={style}
      onClick={() => props.callback(props.character)}
      >
      <div style={{margin:'auto'}}>
        <Image src={props.character.url} rounded size='mini' />
      </div>
      <Header as='h4' style={{margin: '5px'}}>{props.character.cost}</Header>
      <Header as='h3' style={{margin: '5px'}}>{props.character.name}</Header>
    </Segment>
  )
}
