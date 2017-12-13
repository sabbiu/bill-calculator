import { AsyncStorage } from 'react-native';

import {
  CURRENT_ITEM_UPDATE,
  DECIMAL_VALUE_ERROR,
  ADD_TO_LIST,
  LOAD_SAVED_ITEMS,
  SAVE_BILL,
  CLEAR_BILL,
  TOP_UPDATES,
  SAVE_OTHERS

} from './types';

export const currentItemUpdate = ({prop, value}) => {

  // if (prop == 'quantity' || prop == 'rate') {
  //   if(!/^$|^[0-9.]+$/.test(value)) {
  //     return { type: DECIMAL_VALUE_ERROR };
  //   }
  // }

  return {
    type: CURRENT_ITEM_UPDATE,
    payload: {prop, value}
  };
};

export const addToList = ({ items, currentItem, discountPer, title}) => {
  return dispatch => {
    // console.log(props);
    // const items = [ ...props.items, { ...props.currentItem, quantity: props.currentItem.quantity==='' ? 1: props.currentItem.quantity} ];
    const current = {
      items: [ ...items, { ...currentItem, quantity: currentItem.quantity==='' ? 1: currentItem.quantity} ],
      discountPer,
      title
    }
    // AsyncStorage.setItem('current', JSON.stringify());
    AsyncStorage.setItem('current', JSON.stringify(current));
    return dispatch({ type: ADD_TO_LIST });
  }
};

export const loadSaved = () => {
  return(dispatch) => {
    try{
      AsyncStorage.getItem('current').then(current => {
        if (current) {
          dispatch({
            type: LOAD_SAVED_ITEMS,
            payload: JSON.parse(current)
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

export const topUpdates = ({prop, value}) => {
  if (prop == 'discountPer') {
    if(!/^$|^[0-9.]+$/.test(value)) {
      return { type: DECIMAL_VALUE_ERROR };
    }
  }
  return {
    type: TOP_UPDATES,
    payload: {prop, value}
  };
};


export const saveOthers = ({prop, value}) => (dispatch) => {
  try{
    AsyncStorage.getItem('current').then(current => {
      if (current) {
        AsyncStorage.setItem('current', JSON.stringify({...JSON.parse(current), [prop]:value}));        
      } else {
        AsyncStorage.setItem('current', JSON.stringify({[prop]:value}));        
      }
      dispatch({ type: SAVE_OTHERS });
    })
  } catch (error) {
    console.log(error);
  }
};
