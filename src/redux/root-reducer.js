//CODE THAT COMBINES ALL OF THE STATES TOGETHER
import { combineReducers } from 'redux'
import userReducer from './user/user.reducer';

export default combineReducers({
    user: userReducer
});