/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export { default as UserHome } from './UserHome'
export { default as Boards } from './Boards'
export { default as Board } from './Board'
export { default as Pin } from './Pin'
export { default as EditNote } from './EditNote'
export { Login, Signup } from './AuthForm'
