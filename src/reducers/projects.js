import {PROJECT_ACTIONS} from "../actions/projects"

// NOTE: fetchingStatus is one of: never, fetching, fetched
export const projects = (current={fetchingStatus: 'never', data: []}, action) => {
  let payload = action.payload

  switch (action.type) {
    case PROJECT_ACTIONS.SET_PROJECTS:
      return {
        fetchingStatus: payload.fetchingStatus !== undefined ?
          payload.fetchingStatus :
          current.fetchingStatus,
        data: payload.data !== undefined ?
          payload.data :
          current.data
      }
    case PROJECT_ACTIONS.CREATE_PROJECT:
      return {
        ...current,
        data: [
          ...current.data,
          payload.project
        ]
      }
    case PROJECT_ACTIONS.UPDATE_PROJECT:
      let project = payload.project
      let data = current.data
      let new_data = data.find( prj => prj.id === project.id) ?
        data.map( prj => prj.id === project.id ? project : prj ) :
        [
          ...data,
          payload.project
        ]
      return {
        ...current,
        data: new_data
      }
    case PROJECT_ACTIONS.DELETE_PROJECT:
      return {
        ...current,
        data: current.data.filter( prj => prj.id !== payload.project_id )
      }
     default:
      return current;
  }
}