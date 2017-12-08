import {
  SAVE_BILL
} from './types';

export const saveBill = () => {
  return {
    type: SAVE_BILL,
    payload: title
  };
};