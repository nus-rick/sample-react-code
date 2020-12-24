import {USER_ACTIONS} from '../actions/users'
import {PER_PAGE} from '../config/constant'

const initial = {
  // NOTE: fetchingStatus is one of: never, fetching, fetched
  fetchingStatus: 'never',
  data: [],
  metaData: {
    totalPages: 0,
    perPage: PER_PAGE
  }
}

export const users = (current=initial, action) => {
  let payload = action.payload

  switch (action.type) {
    case USER_ACTIONS.SET_USERS:
      return {
        fetchingStatus: payload.fetchingStatus !== undefined ?
          payload.fetchingStatus :
          current.fetchingStatus,
        data: payload.data !== undefined ?
          payload.data :
          current.data,
        metaData: payload.metaData !== undefined ?
          payload.metaData :
          current.metaData
      }
    case USER_ACTIONS.CREATE_USER:
      return {
        ...current,
        data: [
          ...current.data,
          payload.user
        ]
      }
    case USER_ACTIONS.UPDATE_USER:
      let user = payload.user
      let data = current.data
      let new_data = data.find( usr => usr.id === user.id) ?
        data.map( usr => usr.id === user.id ? user : usr) :
        [
          ...data,
          payload.user
        ]
      return {
        ...current,
        data: new_data
      }
    case USER_ACTIONS.DELETE_USER:
      return {
        ...current,
        data: current.data.filter( user => user.id !== payload.user_id )
      }
     default:
      return current;
  }
}