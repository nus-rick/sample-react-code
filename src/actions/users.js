export const USER_ACTIONS = {
  SET_USERS: 'SET_USERS',
  CREATE_USER: 'CREATE_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER'
}

export const setUsers = (payload) => ({
  type: USER_ACTIONS.SET_USERS,
  payload: payload
})

export const getUsers = (nextPage) => {
  return dispatch => {
    dispatch(setUsers({
      fetchingStatus: 'fetching'
    }))
    let params = {page: nextPage}
    return window.axios.get('/users', {params: params}).then( res => {
      return res.status === 200 &&
      dispatch(setUsers({
        fetchingStatus: 'fetched',
        data: res.data.items,
        metaData: res.data.meta_data
      }))
    })
  }
}

export const getUser = (user_id) => {
  return dispatch => {
    return window.axios.get(`/users/${user_id}`)
    .then( res => {
      return res.status === 200 &&
      dispatch({
        type: USER_ACTIONS.UPDATE_USER,
        payload: {user: res.data}
      })
    })
    .catch( e => {
      return false
    })
  }
}

export const createUser = (user) => {
  return dispatch => {
    return window.axios.post('/users', {user: user})
    .then( res => {
      return res.status === 201 &&
      dispatch({
        type: USER_ACTIONS.CREATE_USER,
        payload: {user: res.data}
      })
    })
    .catch( e => {
      return false
    })
  }
}

export const updateUser = (user) => {
  return dispatch => {
    return window.axios.put(`/users/${user.id}`, {user: user})
    .then( res => {
      return res.status === 200 &&
      dispatch({
        type: USER_ACTIONS.UPDATE_USER,
        payload: {user: res.data}
      })
    })
    .catch( e => {
      return false
    })
  }
}

export const deleteUser = (user_id) => {
  return dispatch => {
    return window.axios.delete(`/users/${user_id}`)
    .then( res => {
      return res.status === 200 &&
      dispatch({
        type: USER_ACTIONS.DELETE_USER,
        payload: {user_id: user_id}
      })
    })
    .catch( e => {
      return false
    })
  }
}