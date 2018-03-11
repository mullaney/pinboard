/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Board} = require('../server/db/models')
const { randomInt, randomColor, randomNote } = require('../utils/random')

const randomPin = () => {
  return {
    xPos: randomInt(150, 600),
    yPos: randomInt(150, 600),
    zPos: randomInt(1, 15),
    note: randomNote(),
    noteColor: randomColor()
  }
}

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const boards = await Promise.all([
    Board.create({title: 'improv'}),
    Board.create({title: 'javascript'}),
    Board.create({title: 'contacts'})
  ])

  boards.forEach(async board => {
    await Promise.all([
      board.createPin(randomPin()),
      board.createPin(randomPin()),
      board.createPin(randomPin()),
      board.createPin(randomPin())
    ])
  })
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${boards.length} boards`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    setTimeout(() => {
      db.close()
    }, 1000)
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
