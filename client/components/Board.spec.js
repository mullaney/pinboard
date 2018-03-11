import { Board } from './Board'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('<Board />', () => {
  let boardProps = { id: 1, title: 'pictures' }
  let board

  beforeEach(() => {
    board = shallow(<Board board={boardProps} />)
  })

  it('should render the board title as an h1', () => {
    expect(board.find('.title').text()).to.equal('pictures')
  })
})
