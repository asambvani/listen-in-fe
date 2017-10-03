import React from 'react'
import {Grid} from 'semantic-ui-react'
import '../App.css';

class TopBar extends React.Component{

  componentDidMount = () =>{

  }

  render(){
    return(
      <Grid.Row width={16}>
        <Grid.Column width={4} color="black" textAlign="center">
          <h2 className="topbar-text">YOU'RE LISTEN'N TO:</h2>
        </Grid.Column>
        <Grid.Column width={8} color="black">
        </Grid.Column>
        <Grid.Column width={4} color="blue" textAlign='bottom'>
        <h3>Search</h3>
        </Grid.Column>
      </Grid.Row>
    )
  }

}

export default TopBar
