import { combineReducers } from 'redux';
import AuthReducer from './authReducer';

const reducers = combineReducers({
    auth: AuthReducer,
})

export default reducers;