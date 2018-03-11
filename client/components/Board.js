import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBoard, endDrag, updatePin, updateBoardPin, createNewPin } from '../store'
import { Pin } from './'

export class Board extends Component {
  componentDidMount() {
    if (this.props.match) {
      this.props.loadInitialData(this.props.match.params.id)
    }
  }

  handleMouseDown = (event) => {
    return event
  }

  handleMouseUp = (event) => {
    const highestZ = this.props.board.pins.reduce((max, pin) => {
      return max > pin.zPos ? max : pin.zPos
    }, 0)


    const borderSize = 20
    const top = 68
    const bottom = window.innerHeight - 106
    const left = 130
    const right = window.innerWidth - 168

    const { activePin, isDragging, movePin } = this.props

    if (isDragging) {
      activePin.xPos = event.clientX - borderSize
      activePin.xPos = (activePin.xPos < left) ? left : activePin.xPos
      activePin.xPos = (activePin.xPos > right) ? right : activePin.xPos

      activePin.yPos = event.clientY - borderSize
      activePin.yPos = (activePin.yPos < top) ? top : activePin.yPos
      activePin.yPos = (activePin.yPos > bottom) ? bottom : activePin.yPos

      activePin.zPos = highestZ + 2

      movePin(activePin)
    }
  }

  render() {
    const { board, handleCreateNewPin } = this.props
    const boardId = this.props.match ? this.props.match.params.id : 0

    const { pins } = board

    const highestZ = pins ? pins.reduce((max, pin) => {
      return max > pin.zPos ? max : pin.zPos
    }, 0) : 0

    return (
      <div id="wrapper">
        <div id="header">
          <h1><img onClick={() => {handleCreateNewPin(boardId, highestZ + 2)}} src="/img/pushpin-small.png" alt="push pin" />{board.title}</h1>
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
      dispatch(updatePin(activePin))
      dispatch(updateBoardPin(activePin))
      dispatch(endDrag())
    },
    handleCreateNewPin(boardId, zPos) {
      const newPin = { xPos: 130, yPos: 68, zPos, boardId, isEditing: true, note: '' }
      dispatch(createNewPin(newPin))
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
