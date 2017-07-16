import {combineReducers} from 'redux';
import itemListReducer from './reducer-items';

const allReducers = combineReducers({
    itemList: itemListReducer
});

export default allReducers
