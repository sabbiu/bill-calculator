import { combineReducers } from 'redux';

import bill from './billReducers';
import savedBills from './saveReducers';

export default combineReducers({
  bill,
  savedBills
})
