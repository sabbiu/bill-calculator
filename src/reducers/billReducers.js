import {
  CURRENT_ITEM_UPDATE,
  DECIMAL_VALUE_ERROR,
  ADD_TO_LIST,
  LOAD_SAVED_ITEMS,
  CLEAR_BILL

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

  title: 'New Bill'
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
        const currentItem_temp_2 = {
          ...INITIAL_STATE.currentItem,
          id: action.payload.items.length+1
        }
        const sum_2 = 0;
        action.payload.items.forEach((item)=> sum_2+=item.total);
        
        return { 
          ...state, 
          items: action.payload.items, 
          currentItem: currentItem_temp_2, 
          total: sum_2,
          discount: action.payload.discount
        };
      } else return INITIAL_STATE;

    case CLEAR_BILL:
      console.log(INITIAL_STATE)
      return INITIAL_STATE;

    default:
      return state;
  }
}
  