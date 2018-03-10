import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBoard, endDrag, updatePin } from '../store'
import { Pin } from './'

export class Board extends Component {
  componentDidMount() {
    if (this.props.match) {
      this.props.loadInitialData(this.props.match.params.id)
    }
  }

  handleMouseDown = (event) => {
    // console.log('board down', event)
    // this.setState({
    //   ...this.state,
    //   isDragging: true
    // })
  }

  handleMouseUp = (event) => {
    const { activePin, isDragging, movePin } = this.props
    console.log('activePin Before: ', activePin)
    if (isDragging) {
      activePin.xPos = event.clientX
      activePin.yPos = event.clientY
      movePin(activePin)
    }
  }

  render() {
    const { board } = this.props
    const { pins } = board

    return (
      <div id="wrapper">
        <div id="header">
          <h1><img src="/img/pushpin-small.png" alt="push pin" />{board.title}</h1>
        </div>
        <div
          id="board-canvas"
          onMouseDown={this.handleMouseDown}
          onDragEnd={this.handleMouseUp}
        >
          {pins && pins.map(pin => {
            return <Pin pin={pin} key={`pin-${pin.id}`} />
          })}
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    board: state.board,
    activePin: state.pin,
    isDragging: state.pin.isDragging
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(boardId) {
      dispatch(fetchBoard(boardId))
    },
    movePin(activePin) {
      console.log('activePin After: ', activePin)
      dispatch(updatePin(activePin))
      dispatch(endDrag())
    }
  }
}

export default connect(mapState, mapDispatch)(Board)

Board.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string
  })
}
