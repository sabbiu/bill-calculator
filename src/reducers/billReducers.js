import {
  CURRENT_ITEM_UPDATE,
  DECIMAL_VALUE_ERROR,
  ADD_TO_LIST,
  LOAD_SAVED_ITEMS,
  CLEAR_BILL,
  TOP_UPDATES,
  SAVE_OTHERS

} from '../actions/types';

const INITIAL_STATE = {

  currentItem: {
    id: 1,
    name: '',
    quantity: '',
    rate: '',
    total: 0
  },

  items: [],

  discount: 0,

  total: 0,

  error: '',

  success: '',

  title: 'New Bill',

  discountPer: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case CURRENT_ITEM_UPDATE:
      const currentItem = { ...state.currentItem, [action.payload.prop]: action.payload.value };
      if (currentItem.rate !== '') { 
        if (currentItem.quantity !== '' ) currentItem.total = +currentItem.quantity * currentItem.rate;
        else { currentItem.total = 1 * currentItem.rate; }
      } else currentItem.total = 0;
      return { ...state, currentItem, error:''};
    
    case DECIMAL_VALUE_ERROR:
      return { ...state, error: 'Only numeric value is allowed'};
    
    case ADD_TO_LIST:
      const items = [
        ...state.items,
        {
          ...state.currentItem,
          quantity: state.currentItem.quantity === '' ? 1 : state.currentItem.quantity
        }
      ];

      const currentItem_temp_3 = {
        id: state.currentItem.id+1,
        name: '',
        quantity: '',
        rate: '',
        total: 0
      };

      const sum=0;
      items.forEach((item)=> sum+=item.total);


      return { ...state, items, currentItem: currentItem_temp_3, error:'', total:sum};

    case LOAD_SAVED_ITEMS:
      if (action.payload) {
        if (action.payload.items){
          const currentItem_temp_2 = {
            ...INITIAL_STATE.currentItem,
            id: action.payload.items.length+1
          }
          const sum_2 = 0;
          action.payload.items.forEach((item)=> sum_2+=item.total);

          const discount_temp=0;
          if (action.payload.discountPer != 0)
            discount_temp = sum_2 * action.payload.discountPer /100;
          
          sum_2 -= discount_temp;
          
          return { 
            ...state, 
            items: action.payload.items, 
            currentItem: currentItem_temp_2, 
            total: sum_2,
            discount: discount_temp,
            discountPer: action.payload.discountPer,
            title: action.payload.title
          };
        } else {
          return { ...INITIAL_STATE, ...action.payload };
        }
      } else return INITIAL_STATE;

    case CLEAR_BILL:
      return INITIAL_STATE;
    
    case TOP_UPDATES:
      return { ...state, [action.payload.prop]: action.payload.value };

    case SAVE_OTHERS:
    default:
      return state;
  }
}
  