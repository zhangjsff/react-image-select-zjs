import React from 'react';
import ImageSelectZjs from '../src/main.js'

class Test extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <ImageSelectZjs
        defaultValue="http://img.mianzhiwuyu.com/14745267246138wz-map.jpg@_200w"
        name="file"
        label='LOGO'
        labelSize={18}
      />
    )
  }
}



ReactDom.render(
  <Test></Test>,
  document.getElementById('app-container')
)
