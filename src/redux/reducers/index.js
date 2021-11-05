import {combineReducers} from 'redux';
import {lawReducer} from './lawReducer';

const reducers = combineReducers({
    arlLaws : lawReducer
});

export default reducers;