import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Grid, Dropdown} from 'semantic-ui-react'

let scopes = "user-read-currently-playing+user-modify-playback-state"
//make these server variables
let CLIENT_ID = "63fb384bf7344dd391015f1e54adb289"
let REDIRECT_URI = "http%3A%2F%2Flocalhost%3A3000%2Flogin"
let channels = [
  {key: "1", value:1, text:"CHANNEL 1"},
  {key: "2", value:2, text:"CHANNEL 2"}
]

class App extends Component {
  state = {
    user: {},
    currentSong: {
      name: "",
      position: "",
      isPlaying: false
    },
    currentUserChannel: 0
  }
  handleChannelChange=(event, {value})=>{
    this.setState({
      currentUserChannel: value
    })
  }
  componentDidMount(){
    if (!window.location.href.split('?')[1]){
      window.location = "https://accounts.spotify.com/authorize/?client_id=" + CLIENT_ID + "&response_type=code" + "&redirect_uri="+REDIRECT_URI+"&scope=" + scopes  ;}
      else {
        let id = window.location.href.split('?')[1].split('=')[1]
        let userURL = `http://localhost:3000/api/v1/users/${id}`
            // For Heroku: https://instalytics-api.herokuapp.com/api/v1/users/
            fetch(userURL)
            .then((resp) => resp.json())
            .then(data => this.setState({
              user: data,
              currentUserChannel: data.id
            }))
            .then(()=>{
              setInterval(this.setSongStatus, 5000)
            })
      }
  }


  setSongStatus = () => {

    let playbackURL = `https://api.spotify.com/v1/me/player/currently-playing`
    let init = {headers:{Authorization: `Bearer ${this.state.user.authorization_code}`}}
    if(this.state.user && this.state.currentUserChannel === this.state.user.id){
      fetch(playbackURL, init)
      .then((resp)=> resp.json())
      .then((data) => {
        this.setState({
        currentSong: {
          name: data.item.name,
          position: data.progress_ms,
          isPlaying: data.is_playing
        }
      }, this.broadcastState)})
    }
    else{
      this.setState(
        {currentSong:{
          name: "Another song's channel!"
        }})
    }
  }
  broadcastState = () => {
    let init = {
      method: 'POST',
      body: JSON.stringify({status:'THIS IS A STATUS'}),
      headers: {'Content-Type': 'application/json' }
    }
    let statusURL = 'http://localhost:3000/api/v1/statuses'
    fetch(statusURL,init)
    .then((resp)=> resp.json())
    .then((data)=> console.log(data))
  }
  render() {
    return (
      <Grid>
        <Grid.Row width={16}>
          <Grid.Column width={4} color="black" textAlign="center">
            <h1>Listen'n</h1>
          </Grid.Column>
          <Grid.Column width={12} color="black">
            <h1>Welcome, {this.state.user.display_name}!</h1>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row width={16}>
          <Grid.Column width={4}textAlign="center">
          </Grid.Column>
          <Grid.Column width={12}>
            <h1>Current Song: {this.state.currentSong.name}</h1>
            <h1>Current Song Position: {this.state.currentSong.position}</h1>
            <Dropdown placeholder="Select Channel" search selection options={channels} onChange={this.handleChannelChange}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
