import * as types from './constants'
export const logoutRequest = () => ({
  type: types.LOGOUT,
})

export const loginRequest = (data: any) => ({
  type: types.LOGIN,
  payload: data,
})
export const loginRequestSuccess = (data: any) => ({
  type: types.LOGIN_SUCCESS,
  payload: data,
})
export const registerRequestSuccess = (data: any) => {
  return {
    type: types.REGISTER_SUCCESS,
    payload: data,
  }
}
export const registerRequest = (data: any) => {
  return {
    type: types.REGISTER,
    payload: data,
  }
}
