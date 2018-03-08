import React from 'react'
import Pin from './Pin'

const dummyPins = [
  { id: 1, x: 20, y: 30, z: 11 },
  { id: 2, x: 40, y: 99, z: 12 },
]

const BulletinBoard = () => {
  // console.log('dummyPins', dummyPins)
  return (
    <div id="bulletin-board">
      {dummyPins.map(pin => {
        return <Pin x={pin.x} y={pin.y} z={pin.z} key={pin.id} />
      })}
    </div>
  )
}

export default BulletinBoard
