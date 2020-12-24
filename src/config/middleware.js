// redux-thunk helps dispatch ASYNC an action by permitting a function instead of simple object
import thunk from 'redux-thunk'
// redux-logger will print beauty log into browser console whenever an action is dispatched
import {createLogger} from 'redux-logger'
import {applyMiddleware} from 'redux'

export default applyMiddleware(
  thunk,
  createLogger())