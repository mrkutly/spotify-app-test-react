import React, { Component } from 'react'
import DeviceList from './components/DeviceList'
import PlayBackControls from './components/PlayBackControls'
import NowPlaying from './components/NowPlaying'
import SearchBar from './components/SearchBar'
import ResultCardsContainer from './components/ResultCardsContainer'

export default class Home extends Component {

  state = {
    accessToken: null,
    devices: [],
    deviceId: null,
    currentTrack: null,
    searchResults: [],
    playList: null
  }

  componentDidMount() {
    let accessToken = document.URL.split("token=")[1]

    this.setState({ accessToken }, () => {
      const headers = { 'Authorization': `Bearer ${this.state.accessToken}` }

      fetch('https://api.spotify.com/v1/me/player/devices', {
        method: "GET",
        headers: headers })
        .then(r => r.json())
        .then(({ devices }) => {
          this.setState({ devices })
        })
        .then(() => {
          this.trackRefresh = setInterval(() => {
            fetch('https://api.spotify.com/v1/me/player', {
              method: 'GET',
              headers: headers })
            .then(r => {
              if(r.status === 204) {
                return '204'
              } else {
                return r.json()
              }
            })
            .then(json => {
              if (json === '204'){
                return
              } else if ( this.state.currentTrack === null || json.item.id !== this.state.currentTrack.id ){
                this.setState({ currentTrack: json.item })
              }
            })
          }, 2000)
        })
    })
  }

  componentWillUnmount() {
    clearInterval(this.trackRefresh)
  }

  refreshDevices = () => {
    fetch('https://api.spotify.com/v1/me/player/devices', {
      method: "GET",
      headers: { 'Authorization': `Bearer ${this.state.accessToken}` }})
      .then(r => r.json())
      .then(({ devices }) => {
        this.setState({ devices })
      })
  }

  search = (query) => {
    const formatQuery = query.replace(' ', '%20')

    fetch(`http://localhost:3000/albums/${formatQuery}`, {
      method: 'GET',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).then(r => r.json())
    .then(searchResults => this.setState({ searchResults }))
  }

  setDeviceId = (deviceId) => {
    this.setState({ deviceId })
  }

  setPlayList = (playList) => {
    this.setState({ playList })
  }

  render() {
    const { devices, deviceId, accessToken, playList, currentTrack, searchResults } = this.state

    return (
      <div>
        { devices.length === 0 ? <div> Open Spotify on one of our devices to get started <br /> <button onClick={this.refreshDevices}>Refresh device list</button></div> : null }
        { !deviceId ? <DeviceList devices={devices} accessToken={accessToken} setDeviceId={this.setDeviceId} /> : null }
        { currentTrack ? <NowPlaying track={currentTrack}/> : null}
        { deviceId ? <PlayBackControls accessToken={accessToken} setPlayList={this.setPlayList} /> : null }
        <SearchBar search={this.search} />
        { searchResults.length !== 0 ? <ResultCardsContainer searchResults={searchResults} accessToken={accessToken} playList={playList} /> : null }
      </div>
    )
  }
}
