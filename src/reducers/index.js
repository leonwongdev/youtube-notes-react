import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import noteReducer from './noteReducer';

//key in combineReducers will be the key of the state
export default combineReducers({
    auth: authReducer,
    form: formReducer,
    notes: noteReducer
});
