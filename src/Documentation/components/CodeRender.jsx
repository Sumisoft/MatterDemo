/**
Code Render
==================

Uses React-ace to render the source code

@author Nik Sumikawa
@date Nov 23, 2020
*/

import React, {useState} from 'react';

import {Segment, Button} from 'semantic-ui-react'

import AceEditor from "react-ace"

require("brace/mode/html")
require("brace/mode/jsx")
require("brace/mode/sh")
require("brace/mode/python")
// require("brace/theme/github")
require("brace/theme/dracula")


export default function CodeRender( props ){

  const [source, setSource] = useState('')

  if( props.visible === false ) return null

  var rel_path

  var dir = props.docDir
  if( dir === undefined ) dir = 'doc/components'

  var ext = props.ext
  if( ext === undefined ) ext = '.doc'

  var syntax = 'jsx'
  if( ext === '.py' ) syntax = 'python'

  var filename = props.example.path.split('/')
  filename = filename[filename.length-1] + ext


  try{
    rel_path = require(`Documentation/${dir}/${props.example.path}${ext}`)

  }catch{
    return(
      <Segment>
        Code not available. Please compile to see source
      </Segment>
    )
  }

  // console.log( rel_path.default )
  if( (rel_path !== undefined)&(source === '') ){

    fetch(rel_path.default)
    .then((r) => r.text())
    .then(text  => {
      // console.log('this is the code', text);
      setSource(text)
    })

  }

  // return (<div> example </div>)
  return(

    <Segment>
      <Button
        style={{
          position: 'absolute',
          right: '20px',
          top: '20px',
          zIndex: 10
        }}
        icon = 'download'
        color='red'
        circular
        onClick={() => downloadFile(source, filename)}
        />

      <AceEditor
        editorProps={{ $blockScrolling: Infinity }}
        maxLines={Infinity}
        minLines={10}
        mode={syntax}
        name="jsx-editor"
        onChange={() => console.log('not implemented') }
        tabSize={2}
        theme="dracula"
        value={source}
        width="100%"
        readOnly
      />
    </Segment>
  )
}



function downloadFile( source, filename ){

    const element = document.createElement("a");
    const file = new Blob([source], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}
