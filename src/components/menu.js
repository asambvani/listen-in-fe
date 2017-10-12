import React from 'react'
import {Grid, Icon} from 'semantic-ui-react'
import '../App.css';
import ProfilePhoto from '../components/profilePhoto.js'
class Menu extends React.Component{

  state = {
    channelPhotoURL: ""
  }

  componentWillReceiveProps = () => {

  }
  render(){
    return(
      <Grid.Row width={16} color="grey" id='menu' style={{display:`${this.props.visible?'inline-block':'none'}`}}>
        THIS IS A MF TEST
      </Grid.Row>
    )
  }
}

export default Menu
