import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Grid, Dropdown} from 'semantic-ui-react'
import TopBar from './components/topBar.js'
import ChannelBar from './components/channelBar.js'
import PlayerContainer from './components/playerContainer.js'

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

  pluck = (array,key)=> {
    return array.map(o => o[key])
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
        console.log(data)
        if(data){
          this.setState({
          currentSong: {
            name: data.item.name,
            position: data.progress_ms,
            isPlaying: data.is_playing,
            URI: data.uri,
            album: data.item.album.name,
            artist: this.pluck(data.item.artists, "name").join(", "),
            thumbnailURL: data.item.album.images[1].url,
          }
        }, this.broadcastState)}
        else{

        }
      }

    )
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
      body: JSON.stringify({
        status:{
          channel_id: this.state.user.id,
          current_song: this.state.currentSong.name,
          current_song_uri: this.state.currentSong.URI,
          current_song_album: this.state.currentSong.album,
          current_song_artist: this.state.currentSong.artist,
          current_song_progress: this.state.currentSong.position,
          thumbnail_URL: this.state.currentSong.thumbnailURL
        }
      }),
      headers: {'Content-Type': 'application/json' }
    }
    let statusURL = 'http://localhost:3000/api/v1/statuses'
    fetch(statusURL,init)
  }
  render() {
    return (
      <Grid>
        <TopBar />
        <ChannelBar currentUserChannel= {this.state.currentUserChannel}/>
        <PlayerContainer channels={channels} currentSong={this.state.currentSong}/>

      </Grid>
    );
  }
}

export default App;
