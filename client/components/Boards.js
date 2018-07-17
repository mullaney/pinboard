import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Thumbnail } from './'

export const Boards = (props) => {
  const { boards } = props

  return (
    <div className="container">
      <h1>pinboard</h1>
      <p>Choose one of the boards below:</p>
      <ul className="pinboard-list">
        {boards.map(board => {
          return (
            <li key={`board-${board.id}`}>
              <NavLink to={`/boards/${board.id}`}>
                <Thumbnail title={board.title} />
              </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const mapState = (state) => {
  return {
    boards: state.boards
  }
}

export default connect(mapState)(Boards)

Boards.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    })
  )
}
