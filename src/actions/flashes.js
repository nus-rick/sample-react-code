export const FLASH_ACTIONS = {
  CREATE_FLASH: 'CREATE_FLASH',
  DELETE_FLASH: 'DELETE_FLASH'
}

export const createFlash = (flash) => ({
  type: FLASH_ACTIONS.CREATE_FLASH,
  payload: {flash: flash}
})

export const deleteFlash = (flash_id) => ({
  type: FLASH_ACTIONS.DELETE_FLASH,
  payload: {flash_id: flash_id}
})