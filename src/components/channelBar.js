import React from 'react'
import {Grid, Icon} from 'semantic-ui-react'
import '../App.css';
import ProfilePhoto from '../components/profilePhoto.js'
class channelBar extends React.Component{

  state = {
    channelPhotoURL: ""
  }

  componentWillReceiveProps = () => {
    fetch(`http://localhost:3000/api/v1/users/${this.props.currentUserChannel}`)
    .then((resp)=> resp.json())
    .then((data)=> this.setState({
      channelPhotoURL: data.profile_photo_url,
      channelName: data.display_name
    }))
  }
  render(){
    return(
      <Grid.Row width={16} color="black">
        <Grid.Column width={2} color="black" textAlign="center">
          <ProfilePhoto channelPhotoURL = {this.state.channelPhotoURL} />
        </Grid.Column>
        <Grid.Column width={6} color="black" textAlign="middle">
          <h2 className="topbar-text">{this.state.channelName }{" "}<Icon className='plus tiny' onClick={this.props.expandMenu}></Icon></h2>

        </Grid.Column>
      </Grid.Row>
    )
  }

}

export default channelBar
