import { combineReducers } from 'redux';

import billReducers from './billReducers';

export default combineReducers({
  bill: billReducers
})
