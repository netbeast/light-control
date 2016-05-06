import React from 'react'

import ColorPicker from 'react-color'
import netbeast from 'netbeast'

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
  }

  handleClick (power) {
    this.setState({ power: power })
    this.sendData({ power: power, color: this.state.color })
  }

  sendData (status) {
    netbeast('lights').set(status)
  }

  render () {
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
