import React, { Component } from 'react'

export default class ResultCard extends Component {

  addToCurrentPlayList = (e) => {
    const { accessToken, playList } = this.props
    const { uri, id } = this.props.result

    fetch(`https://api.spotify.com/v1/albums/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(r => r.json())
    .then(j => {
      let uris = j.tracks.items.map(track => track.uri)
      let headers = { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' }
      if (playList){
        fetch(`https://api.spotify.com/v1/playlists/${playList}/tracks`, {
          method: 'POST',
          mode: 'cors',
          headers: headers,
          body: JSON.stringify({
            "uris": uris
          })
        })
      } else {
        fetch(`https://api.spotify.com/v1/me/albums?ids=${j.id}`, {
          method: 'PUT',
          headers: headers
        })
      }
    })

  }

  render() {
    const { name, artists } = this.props.result
    return (
      <li>
        <p>{name} - {artists[0].name} </p> <button onClick={this.addToCurrentPlayList}>Add to current playlist</button>
      </li>
    )
  }
}
