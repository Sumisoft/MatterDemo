
import { Segment } from 'semantic-ui-react'

import TowerDefense from 'Game/views/TowerDefense'

//json array containing all available characters
const characterJson = [
  {
    url: '/images/ninja.png',
    name: 'Ninja',
    cost: 10,
    alias: 1,
    level: 1,
  },
  {
    url: '/images/ninja.png',
    name: 'Panda',
    cost: 20,
    alias: 2,
    level: 1,
  },
]

// selection Menu test function
export default function TowerDefenseDemo(props){

  return( <TowerDefense characterJson={characterJson} /> )

}


// <Image src='/images/wireframe/image.png' size='small' />
