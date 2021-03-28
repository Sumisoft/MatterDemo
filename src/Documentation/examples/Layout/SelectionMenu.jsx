
import { Segment } from 'semantic-ui-react'

import SelectionMenu from 'Game/components/Game/SelectionMenu/React'

//json array containing all available characters
const characterJson = [
  {
    url: '/images/ninja.png',
    name: 'Ninja',
    cost: 10,
    alias: 1,
  },
  {
    url: '/images/ninja.png',
    name: 'Panda',
    cost: 20,
    alias: 2,
  },
]

// selection Menu test function
export default function SelectionMenuDev(props){

  return( <SelectionMenu characterJson={characterJson} /> )

}


// <Image src='/images/wireframe/image.png' size='small' />
