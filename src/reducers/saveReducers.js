import {
  SAVE_BILL
} from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
  
    case SAVE_BILL:
      return [...state, action.payload];

    default:
      return state;
  }
}
