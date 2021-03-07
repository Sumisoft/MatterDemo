/**
Sidebar
==================

Renders a sidebar based on the configuration file

@author Nik Sumikawa
@date Nov 23, 2020
*/

import React from 'react';

import {Menu, Dropdown} from 'semantic-ui-react'

import jsonArray from './jsonArray'




// renders a sidebar given an array of category names
export default function Sidebar( props ){

  var menuItems = flat_categories(props )
  menuItems = menuItems.concat( sub_categories(props) )

  return (
    <Menu pointing secondary vertical>
      {menuItems}
    </Menu>
  )

}

// renders categories without sub categories
function flat_categories( props ){


  const config = props.config.filter(r => r.subcategory === undefined )
  // console.log( 'jsonArray', props.config instanceof jsonArray)
  const categories = config.unique(['category'])

  var menuItems = []
  for( var i=0; i < categories.length; i++ ){
    const cat = categories[i]

    menuItems.push(
      <Menu.Item
        key={`menu-${cat}`}
        name={cat}
        active={props.category === cat}
        onClick={() => {
          props.setCategory(cat)
          props.setSubCategory(undefined)
        }}
      />
    )
  }

  return menuItems
}


// renders categories without sub categories
function sub_categories( props ){


  const config = props.config.filter(r => r.subcategory !== undefined )
  const groups = config.groupby(['category'])

  var menuItems = []
  for( var i=0; i < groups.length; i++ ){

    const cat = groups[i].category
    const subcategories = new jsonArray(groups[i].json_obj).unique(['subcategory'])

    var subMenuItems = []
    for( var j=0; j < subcategories.length; j++ ){
      const subcat = subcategories[j]

      subMenuItems.push(
        <Dropdown.Item
          key={`dropdown-${cat}-${subcat}`}
          onClick={() => {
            props.setCategory(cat)
            props.setSubCategory(subcat)
          }}
          >
          {subcat}
        </Dropdown.Item>
      )
    }

    menuItems.push(
      <Dropdown
        key={`dropdown-${cat}`}
        item
        text={cat}>
        <Dropdown.Menu>
          {subMenuItems}
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  return menuItems
}
