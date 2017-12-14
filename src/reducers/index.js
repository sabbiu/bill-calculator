import { combineReducers } from 'redux';

import bill from './billReducers';
import browseBills from './saveReducers';

export default combineReducers({
  bill,
  browseBills
})
