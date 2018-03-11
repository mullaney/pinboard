
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

const randomNotes = [
  'Some simple text',
  '# Markdown\n- [ ] Checkbox',
  '[I\'m an inline-style link](https://www.google.com)',
  '![alt text](https://picsum.photos/300/300/ "Logo Title Text 1")'
]

const randomColors = [
  'lightyellow',
  'lightcyan',
  'lightpink',
  'lightsteelblue',
  'lightgray',
  'mistyrose',
  'palegreen',
  'aliceblue',
  'antiquewhite'
]

const randomNote = () => {
  return randomNotes[Math.floor(Math.random() * randomNotes.length)]
}

const randomColor = () => {
  return randomColors[Math.floor(Math.random() * randomColors.length)]
}

module.exports = { randomColor, randomNote, randomInt }
