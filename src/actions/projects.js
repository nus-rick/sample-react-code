export const PROJECT_ACTIONS = {
  SET_PROJECTS: 'SET_PROJECTS',
  CREATE_PROJECT: 'CREATE_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT'
}

export const setProjects = (payload) => ({
  type: PROJECT_ACTIONS.SET_PROJECTS,
  payload: payload
})

export const getProjects = () => {
  // redux-thunk helps dispatch ASYNC an action by permitting dispatch a function instead of simple object
  return dispatch => {
    dispatch(setProjects({
      fetchingStatus: 'fetching'
    }))
    // we can request API to get projects inside componentDidMount callback of Component, receive projects data and call setProjects action to dispatch projects. But If go that way, we can not reuse above process in other places/components.
    return window.axios.get('/projects').then( res => {
      return res.status === 200 &&
      dispatch(setProjects({
        fetchingStatus: 'fetched',
        data: res.data
      }))
    })
  }
}

export const getProject = (project_id) => {
  return dispatch => {
    return window.axios.get(`/projects/${project_id}`)
    .then( res => {
      return res.status === 200 &&
      dispatch({
        type: PROJECT_ACTIONS.UPDATE_PROJECT,
        payload: {project: res.data}
      })
    })
    .catch( e => {
      return false
    })
  }
}

export const createProject = (project) => {
  return dispatch => {
    return window.axios.post('/projects', {project: project})
    .then( res => {
      return res.status === 201 &&
      dispatch({
        type: PROJECT_ACTIONS.CREATE_PROJECT,
        payload: {project: res.data}
      })
    })
    .catch( e => {
      return false
    })
  }
}

export const updateProject = (project) => {
  return dispatch => {
    return window.axios.put(`/projects/${project.id}`, {project: project})
    .then( res => {
      return res.status === 200 &&
      dispatch({
        type: PROJECT_ACTIONS.UPDATE_PROJECT,
        payload: {project: res.data}
      })
    })
    .catch( e => {
      return false
    })
  }
}

export const deleteProject = (project_id) => {
  return dispatch => {
    return window.axios.delete(`/projects/${project_id}`)
    .then( res => {
      return res.status === 200 &&
      dispatch({
        type: PROJECT_ACTIONS.DELETE_PROJECT,
        payload: {project_id: project_id}
      })
    })
    .catch( e => {
      return false
    })
  }
}
