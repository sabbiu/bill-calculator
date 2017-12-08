import { AsyncStorage } from 'react-native';

import {
  CURRENT_ITEM_UPDATE,
  DECIMAL_VALUE_ERROR,
  ADD_TO_LIST,
  LOAD_SAVED_ITEMS,
  SAVE_BILL,
  CLEAR_BILL

} from './types';

export const currentItemUpdate = ({prop, value}) => {

  if (prop == 'quantity' || prop == 'rate') {
    if(!/^$|^[0-9.]+$/.test(value)) {
      return { type: DECIMAL_VALUE_ERROR };
    }
  }

  return {
    type: CURRENT_ITEM_UPDATE,
    payload: {prop, value}
  };
};

export const addToList = (props) => {
  console.log(props);
  const items = [ ...props.items, { ...props.currentItem, quantity: props.currentItem.quantity==='' ? 1: props.currentItem.quantity} ];
  const current = {
    items,
    discount: props.discount
  }
  // AsyncStorage.setItem('current', JSON.stringify());
  AsyncStorage.setItem('current', JSON.stringify(current));
  return { type: ADD_TO_LIST };
};

export const loadSaved = () => {
  return(dispatch) => {
    try{
      AsyncStorage.getItem('current').then(items => {
        console.log('items received', items)
        if (items) {
          dispatch({
            type: LOAD_SAVED_ITEMS,
            payload: JSON.parse(items)
          });
        } else {
          dispatch({
            type: LOAD_SAVED_ITEMS,
            payload: null
          });
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
};

export const clearBill = () => {
  return (dispatch) => {
    AsyncStorage.setItem('current', JSON.stringify(null));
    return dispatch({ type: CLEAR_BILL });
  }
};

