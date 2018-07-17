import React from 'react'
import PropTypes from 'prop-types'


export const Thumbnail = (props) => {
  const { title } = props

  return (
    <div className="board-thumbnail">
      {title}
    </div>
  )
}

export default Thumbnail

Thumbnail.propTypes = {
  title: PropTypes.string
}
