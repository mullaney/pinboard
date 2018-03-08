import React from 'react'
import Pin from './Pin'

const dummyPins = [
  { id: 1, xPos: 20, yPos: 30, zPos: 11 },
  { id: 2, xPos: 40, yPos: 99, zPos: 12 },
]

const BulletinBoard = () => {
  // console.log('dummyPins', dummyPins)
  return (
    <div id="bulletin-board">
      {dummyPins.map(pin => {
        return <Pin xPos={pin.xPos} yPos={pin.yPos} zPos={pin.zPos} key={pin.id} />
      })}
    </div>
  )
}

export default BulletinBoard
