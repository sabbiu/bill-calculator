import { AsyncStorage } from 'react-native';

import {
  CURRENT_ITEM_UPDATE,
  DECIMAL_VALUE_ERROR,
  ADD_TO_LIST,
  LOAD_SAVED_ITEMS,
  CLEAR_BILL,
  TOP_UPDATES,
  SAVE_OTHERS,
  DELETE_ROW,
  EDIT_ROW,
  SAVE_EDIT_TO_LIST,
  SHOW_SAVING,
  NEW_BILL

} from './types';

export const currentItemUpdate = ({prop, value}) => {
  return {
    type: CURRENT_ITEM_UPDATE,
    payload: {prop, value}
  };
};

export const addToList = ({ items, currentItem, discountPer, title, billId}) => {
  return dispatch => {
    const current = {
      items: [ ...items, { ...currentItem, quantity: currentItem.quantity==='' ? 1: currentItem.quantity} ],
      discountPer,
      title,
      billId
    }
    AsyncStorage.setItem('current', JSON.stringify(current));
    return dispatch({ type: ADD_TO_LIST });
  }
};

export const saveEditItem = ({ items, currentItem, discountPer, title, billId }) => {
  return dispatch => {
    let items_temp = [];

    for (let i=0; i<items.length; i++) {
      if (currentItem.id !== i+1) items_temp.push({...items[i]});
      else items_temp.push({...currentItem});
    }
    const current = {
      items: items_temp,
      discountPer,
      title,
      billId
    }
    AsyncStorage.setItem('current', JSON.stringify(current));
    return dispatch({ type: SAVE_EDIT_TO_LIST });
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
      // console.log(error);
    }
  }
};

export const clearBill = () => {
  return (dispatch) => {
    AsyncStorage.setItem('current', JSON.stringify(null));
    return dispatch({ type: CLEAR_BILL });
  }
};

export const newBill = () => {
  return (dispatch) => {
    AsyncStorage.setItem('current', JSON.stringify(null));
    return dispatch({ type: NEW_BILL });
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
    // console.log(error);
  }
};

export const deleteListRow = ({rowId, items, discountPer, title, billId}) => {
  return dispatch => {
    let items_temp_1 = [];
    for(let i=0; i<items.length; i++) {
      if (i<rowId) items_temp_1.push({...items[i]});
      else if (i>rowId) items_temp_1.push({...items[i], id:items[i].id-1});
    }

    const current = {
      items: items_temp_1,
      discountPer,
      title,
      billId
    }
    AsyncStorage.setItem('current', JSON.stringify(current));

    return dispatch({ type: DELETE_ROW, payload: rowId });
  }
};

export const editListRow = rowId => {
  return { type: EDIT_ROW, payload: rowId };
};

export const saveBill = (navigator, bill, billId, bill_details) => dispatch => {
  try{
    dispatch({ type: SHOW_SAVING, payload: true });
    // // clearing saved items
    // AsyncStorage.setItem('savedBill', JSON.stringify([]));
    
    AsyncStorage.getItem('savedBill').then(savedBill => {
      if (savedBill) {
        if (billId === '') {
          AsyncStorage.setItem('savedBill', JSON.stringify([bill, ...JSON.parse(savedBill)]));        
        } else {
          const newlySavedBill = JSON.parse(savedBill).map( item => {
            if (item.id == billId ) return bill;
            else return item;
          })
          AsyncStorage.setItem('savedBill', JSON.stringify(newlySavedBill));        
        }
      } else {
        AsyncStorage.setItem('savedBill', JSON.stringify([bill]));
      }
      AsyncStorage.setItem(bill.id, JSON.stringify(bill_details));
      AsyncStorage.setItem('current', JSON.stringify(null));

      dispatch({ type: NEW_BILL });
      dispatch({ type: SHOW_SAVING, payload: false });
      navigator.push({
        screen: 'browse',
        title: 'Browse Bills'
      });
    })
  } catch (error) {
    // console.log(error);
  }
};
