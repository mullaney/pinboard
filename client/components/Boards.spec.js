import { Boards } from './Boards'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('<Boards />', () => {
  let boardsProps = [{ id: 1, title: 'pictures' }]
  let boards

  beforeEach(() => {
    boards = shallow(<Boards boards={boardsProps} />)
  })

  it('should render the board title as an h1', () => {
    expect(boards.find('h1').text()).to.equal('My Boards')
  })
})
