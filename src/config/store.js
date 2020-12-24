import {
  combineReducers,
  createStore } from 'redux'
import middleware from './middleware'
import {users} from '../reducers/users'
import {projects} from '../reducers/projects'
import {flashes} from '../reducers/flashes'
// https://github.com/APSL/redux-i18n#redux-reducer
import {i18nState} from "redux-i18n"
// https://github.com/kylecorbelli/redux-token-auth#redux-reducer
import {
  reduxTokenAuthReducer
} from 'redux-token-auth'

const storeStructure = combineReducers({
  projects,
  users,
  flashes,
  // NOTE: default of i18nState: {
  //   lang: 'en',
  //   translations: {},
  //   forceRefresh: false
  // }
  i18nState,
  // NOTE: default of reduxTokenAuth
  // currentUser: {
  //   isLoading: false,
  //   isSignedIn: false,
  //   attributes: {
  //     email: null,
  //   },
  // }
  reduxTokenAuth: reduxTokenAuthReducer,
})

export default createStore(storeStructure, middleware)
