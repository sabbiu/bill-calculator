import moment from 'moment';
import _ from 'lodash';

import {
  FETCH_BILLS
} from '../actions/types';

const INITIAL_STATE = {
  savedBills: [],
  loading: true
}

moment.updateLocale('en', {
  calendar : {
    lastDay : '[Yesterday]',
    sameDay : '[Today]',
    lastWeek : 'MMM, YYYY',
    sameElse : 'MMM, YYYY'
  }
});

export default function(state = INITIAL_STATE, action) {

  switch(action.type) {
    
    case FETCH_BILLS:
      let modified = action.payload.map(item => {
        return {
          header: moment(item.id).calendar(),
          ...item
        }
      });

      let savedBills = _.groupBy(modified, d => d.header);
      savedBills = _.reduce(savedBills, (acc, next, index) => {
        acc.push({ key: index, data: next });
        return acc;
      }, []);

      return { ...state, savedBills, loading: false};

    default:
      return state;
  }
}
