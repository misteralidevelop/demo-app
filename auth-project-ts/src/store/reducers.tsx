import { combineReducers } from 'redux'
import AuthReducer from "../pages/Auth/redux/reducer";
const rootReducer= combineReducers({
    Auth: AuthReducer
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer