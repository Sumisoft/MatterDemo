
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

const enemyScript = [
  {
    row:0,
    charType:1,
    level:1,
    time: 1,
  },
  // {
  //   row:1,
  //   charType:1,
  //   level:1,
  //   time: 5,
  // },
  // {
  //   row:2,
  //   charType:1,
  //   level:1,
  //   time: 10,
  // },
]

// selection Menu test function
export default function TowerDefenseDemo(props){

  return(
    <TowerDefense
      enemyScript={enemyScript}
      characterJson={characterJson}
      />
  )

}


// <Image src='/images/wireframe/image.png' size='small' />
