import {FLASH_ACTIONS} from "../actions/flashes"

export const flashes = (currentFlashes=[], action) => {
  let payload = action.payload

  switch (action.type) {
    case FLASH_ACTIONS.CREATE_FLASH:
      return [
        ...currentFlashes,
        {
          ...payload.flash,
          id: Date.now()
        }
      ]
    case FLASH_ACTIONS.DELETE_FLASH:
      return currentFlashes.filter( flash =>
        flash.id !== payload.flash_id)
    default:
       return currentFlashes;
  }
}