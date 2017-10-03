import React from 'react'
import {Grid, img} from 'semantic-ui-react'
import '../App.css';
class profilePhoto extends React.Component{


  render(){
    return(
      <Grid.Row width={16}>
      <img className='ui tiny circular image channel-image' src={this.props.channelPhotoURL}/>
      </Grid.Row>
    )
  }

}

export default profilePhoto
