import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Pin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDragging: false,
      xDrag: 0,
      yDrag: 0
    }
    // this.handleMouseDown = this.handleMouseDown.bind(this)
    // this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  handleMouseDown = (event) => {
    console.log('pin down', event.target.attributes.value.value)
    // this.setState({
    //   ...this.state,
    //   isDragging: true
    // })
  }

  handleMouseUp = (event) => {
    console.log('pin up', event.target.attributes.value.value)
    // this.setState({
    //   ...this.state,
    //   isDragging: false
    // })
  }

  render() {
    const { xPos, yPos, zPos, id } = this.props.pin

    const style = {
      top: `${yPos}px`,
      left: `${xPos}px`,
      zIndex: `${zPos}`,
      position: 'absolute',
      backgroundImage: `url('/img/pushpin-small.png')`,
      height: '40px',
      width: '40px',
      cursor: 'move'
    }

    return (
      <div style={style} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} value={id} />
    )
  }
}

export default Pin

Pin.propTypes = {
  pin: PropTypes.shape({
    xPos: PropTypes.number,
    yPos: PropTypes.number,
    zPos: PropTypes.number,
    id: PropTypes.number
  })
}
