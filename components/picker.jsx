import React from 'react'
import mqtt from 'mqtt'

import ColorPicker from 'react-color'
import netbeast from 'netbeast'

var client = mqtt.connect('mqtt://test.mosca.io')

client.on('connect', function () {
  client.subscribe('notifications')
})

export default class Picker extends React.Component {
  constructor () {
    super()
    this.state = {
      color: '#fff',
      power: false
    }
    this.handleChangeComplete = this.handleChangeComplete.bind(this)
  }

  handleChangeComplete (color) {
    this.setState({ color: color.hex })
    this.sendData({ power: this.state.power, color: color.hex })
    client.publish('notifications', 'Color changed to ' + color.hex)
  }

  handleClick (power) {
    this.setState({ power: power })
    this.sendData({ power: power, color: this.state.color })
    client.publish('notifications', 'Power is ' + power)
  }

  sendData (status) {
    netbeast('lights').set(status)
  }

  render () {
    console.log('done')

    return (
      <div>
        <ColorPicker color={ this.state.color } type='material' onChangeComplete={ this.handleChangeComplete } />
        <ColorPicker color={ this.state.color } type='slider' onChangeComplete={ this.handleChangeComplete } />
        <button onClick={ this.handleClick.bind(this, true) }>On</button>
        <button onClick={ this.handleClick.bind(this, false) }>Off</button>
      </div>
    )
  }
}
