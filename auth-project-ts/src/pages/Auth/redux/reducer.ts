import * as types from './constants'
import produce from 'immer'
const initialState = {
  user: null,
  token: null,
  loader: false,
  pending: false,
}

const Auth = produce((state = initialState, action: any) => {
  switch (action.type) {
    case types.LOGIN:
    case types.REGISTER:
      state.pending = true
      break
    case types.LOGIN_SUCCESS:
      state.user = action.payload.user
      state.token = action.payload.access_token
      state.pending = false
      break

    case types.REGISTER_SUCCESS:
      state.pending = false
      break
    case types.LOGOUT:
      state.user = null
      state.token = null
      break
    default:
  }
}, initialState)

export default Auth
