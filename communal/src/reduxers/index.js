import { combineReducers } from 'redux';
import InebriantReducer from './inebriant-reducer';
import MisschildrenReducer from './misschildren-reducer';
import PropvalReducer from './propval-reducer';

const RootReducer = combineReducers({
	inebriants: InebriantReducer,
	missChildren: MisschildrenReducer,
	propvalObj: PropvalReducer
});

export default RootReducer;
