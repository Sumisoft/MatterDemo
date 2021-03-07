/**
Example Components
==================

Renders all examples using a single component with
hotswapping. This consolidates all examples into a
single component and avoids multiple pages/routes

@author Nik Sumikawa
@date Nov 23, 2020
*/

import React, {useState} from 'react';

import {Segment} from 'semantic-ui-react'

import Controls from './Header'
import CodeRender from './CodeRender'



export default function Example( props ){

  const [showCode, setShowCode] = useState(false)

  var Component

  var dir = props.jsxDir
  if( dir === undefined ) dir = 'doc/components'

  try{
    Component = require(`Documentation/${dir}/${props.example.path}`).default
  }catch{
    Component = NullComponent
  }

  console.log( 'what are the components', Component)

  return(
    <Segment.Group>
      <Segment>
        <Controls
          title = {props.example.title}
          description = {props.example.description}
          onClick={() => setShowCode(!showCode)}
          />
      </Segment>

      <Segment style={{width:'100%'}}>
        <Component {...props}/>
      </Segment>

      <CodeRender
        {...props}
        visible = {showCode}
        />

    </Segment.Group>
  )
}

function NullComponent(props){ return null }
