import { combineReducers } from 'redux';
import InebriantReducer from './inebriant-reducer';

const RootReducer = combineReducers({
	inebriants: InebriantReducer
});

export default RootReducer;