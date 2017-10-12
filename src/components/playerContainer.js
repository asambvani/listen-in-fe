import React from 'react'
import {Grid, Dropdown, Image} from 'semantic-ui-react'
import '../App.css';

class PlayerContainer extends React.Component{

  handleChannelChange=()=>{
    
  }
  render(){
    return(
      <Grid.Row width={16} color='black' centered>
        <Grid.Column width={3} textAlign="center">
        </Grid.Column>
        <Grid.Column width={5} textAlign='center' floated image>
          <Image src={this.props.currentSong.thumbnailURL} centered></Image>
        </Grid.Column>
        <Grid.Column width={6}>
          <h1>{this.props.currentSong.name}</h1>
          <h3>{this.props.currentSong.artist}</h3>
          <h3>{this.props.currentSong.album}</h3>
          <h3>Current Song Position: {this.props.currentSong.position}</h3>
          <Dropdown placeholder="Select Channel" search selection options={this.props.channels} onChange={this.handleChannelChange}/>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

export default PlayerContainer
