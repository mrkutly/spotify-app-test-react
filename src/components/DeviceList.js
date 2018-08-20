import React, { Component } from 'react'
import Device from './Device'

class DeviceList extends Component {

  mappedDevices = () => {
    return this.props.devices.map(device => (
      <Device key={device.id} device={device} setDeviceId={this.props.setDeviceId} accessToken={this.props.accessToken}/>)
    )
  }

  render() {
    return (
      <ul>
        {this.mappedDevices()}
      </ul>
    )
  }
}

export default DeviceList
