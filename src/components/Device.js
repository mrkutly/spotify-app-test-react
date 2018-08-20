import React, { Component } from 'react'

export default class Device extends Component {

  selectDevice = (e) => {
    const { device, setDeviceId } = this.props

    fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.props.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        device_ids: [device.id],
        play: true
      })
    }).then(() => setDeviceId(device.id))
  }

  render() {
    const { device } = this.props

    return (
      <li onClick={this.selectDevice}>{device.name}</li>
    )
  }
}
