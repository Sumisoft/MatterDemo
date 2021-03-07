/**
 * @title Controls
 * @description Example Header and controls
 * @author Nik sumikawa
 * @date Nov 21, 2020
 *
 * note taken from react-hot-docs
 */

import React from "react"

import {
  Grid,
  Header,
  Button
} from "semantic-ui-react"


export default function Controls( props ){

  // do not render the component when the visiblility flag
  // is set to false
  if( props.visible === false ) return null

  var title
  if( props.title !== undefined ) title = props.title

  var description
  if( props.description !== undefined ) description = props.description

  return(
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Header as="h2">{title}</Header>
          <span>{description}</span>
        </Grid.Column>


        <Grid.Column textAlign='right'>
          <Button
            onClick={() => props.onClick()}>
            Show code
          </Button>
        </Grid.Column>
      </Grid.Row>

    </Grid>
  )

}
