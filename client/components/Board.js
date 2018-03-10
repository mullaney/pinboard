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

  // handleMouseUp(event) {
  //   console.log('X, Y', event.clientX, event.clientY)
  // }

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
          onMouseDown={() => {console.log('down')}}
          onMouseUp={this.props.handleMouseUp}>
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
    handleMouseUp(event) {
      console.log('X, Y', event.clientX, event.clientY)
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
