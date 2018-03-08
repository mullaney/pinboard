import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBoard } from '../store'
// import { NavLink } from 'react-router-dom'

export class Board extends Component {
  componentDidMount() {
    if (this.props.match) {
      this.props.loadInitialData(this.props.match.params.id)
    }
  }

  render() {
    const { board } = this.props

    return (
      <div id="wrapper">
        <div id="header">
          <h1><img src="/img/pushpin-small.png" alt="push pin" />{board.title}</h1>
        </div>
        <div id="board-canvas" />
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
