import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

export const Boards = (props) => {
  const { boards } = props

  return (
    <div className="container">
      <h1>My Boards</h1>
      <ul>
        {boards.map(board => {
          return (
            <NavLink key={`board-${board.id}`} to={`/boards/${board.id}`}>
              <li>{board.title}</li>
            </NavLink>
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
