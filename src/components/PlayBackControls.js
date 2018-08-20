import React, { Component } from 'react'

export default class PlayBackControls extends Component {

  state = {
    shuffle: null,
  }

  componentDidMount() {
    this.refreshPlayerStatus = setInterval(() => {
      fetch('https://api.spotify.com/v1/me/player', {
        method: 'GET',
        headers: this.headers()
      })
      .then(r => {
        return (r.status === 204 ? '204' : r.json())
      })
      .then(json => {
        if (json === '204'){
          return
        } else {
          if (json.context === null) {
            this.setState({ shuffle: json.shuffle_state })
            this.props.setPlayList(null)
          } else {
            let listArray = json.context.href.split('/')
            let listId = listArray[listArray.length - 1]

            this.setState({ shuffle: json.shuffle_state })
            this.props.setPlayList(listId)
          }
        }
      })
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.refreshPlayerStatus)
  }

  headers = () => {
    return {
      'Authorization': `Bearer ${this.props.accessToken}`,
      'Content-Type': 'application/json'
    }
  }

  play = (e) => {
    fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: this.headers()
    })
  }

  pause = (e) => {
    fetch('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: this.headers()
    })
  }

  next = (e) => {
    fetch('https://api.spotify.com/v1/me/player/next', {
      method: 'POST',
      headers: this.headers()
    })
  }

  previous = (e) => {
    fetch('https://api.spotify.com/v1/me/player/previous', {
      method: 'POST',
      headers: this.headers()
    })
  }

  shuffle = (e) => {
    fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${!this.state.shuffle}`, {
      method: 'PUT',
      headers: this.headers()
    })
    .then(() => {
      this.setState(prev => {
        return { shuffle: !prev.shuffle }
      })
    })
  }

  render() {
    const { shuffle } = this.state

    return (
      <div>
        <button onClick={this.play}>Play</button>
        <button onClick={this.pause}>Pause</button>
        <button onClick={this.next}>Next</button>
        <button onClick={this.previous}>Previous</button>
        <button onClick={this.shuffle}>{ shuffle ? 'Shuffle Off' : 'Shuffle On' }</button>
      </div>
    )
  }
}
