import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBoard } from '../store'
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
    // console.log('board up', event.clientX, event.clientY)
    // this.setState({
    //   ...this.state,
    //   isDragging: false
    // })
  }

  render() {
    const { board } = this.props
    const { pins } = board

    return (
      <div id="wrapper">
        <div id="header">
          <h1><img src="/img/pushpin-small.png" alt="push pin" />{board.title}</h1>
        </div>
        <div id="board-canvas" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
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
    board: state.board
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(boardId) {
      dispatch(fetchBoard(boardId))
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
