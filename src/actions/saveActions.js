import { AsyncStorage } from 'react-native';
import _ from 'lodash';

import {
  FETCH_BILLS, 
  SHOW_SAVING,
  POPULATE_BILL
} from './types';

export const fetchBills = () => dispatch => {
  AsyncStorage.getItem('savedBill').then(savedBill => {
    if (savedBill) {
      dispatch({ type: FETCH_BILLS, payload: JSON.parse(savedBill)})
    } else {
      dispatch({ type: FETCH_BILLS, payload: []})
    }
    
  })
};

export const loadThisBill = id => dispatch => {
  dispatch({ type: SHOW_SAVING, payload: true });

  // console.log(id);
  AsyncStorage.getItem(id).then(bill => {
    if (bill) {
      // console.log(JSON.parse(bill))
      dispatch({ type: POPULATE_BILL, payload: JSON.parse(bill) })
    }
    dispatch({ type: SHOW_SAVING, payload: false });
  });

}

export const deleteBill = id => dispatch => {
  AsyncStorage.getItem('savedBill').then(savedBill => {
    if (savedBill) {
      let saved = JSON.parse(savedBill);
      _.remove(saved, { id });
      AsyncStorage.setItem('savedBill', JSON.stringify(saved));
      AsyncStorage.removeItem(id);

      dispatch({ type: FETCH_BILLS, payload: saved })
    } else {
      dispatch({ type: FETCH_BILLS, payload: []})
    }
    
  })
}
