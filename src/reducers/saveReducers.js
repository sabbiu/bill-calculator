import {
  FETCH_BILLS
} from '../actions/types';

const INITIAL_STATE = {
  savedBills: [],
  loading: true
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    
    case FETCH_BILLS:
      return { ...state, savedBills: [...action.payload], loading: false};

    default:
      return state;
  }
}
