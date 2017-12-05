import {
  SAMPLE_TEXT
} from '../actions/types';

const INITIAL_STATE = {
  text: 'kei ni vayena :('
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAMPLE_TEXT:
      return { ...state, text: action.payload };
      
    default:
      return state;
  }
}
  