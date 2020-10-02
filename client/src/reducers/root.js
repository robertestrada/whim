import { combineReducers } from 'redux';
import authentication from './authentication';
import cart from './cart';

const rootReducer = combineReducers({
  authentication,
  cart,
});

export default rootReducer;
