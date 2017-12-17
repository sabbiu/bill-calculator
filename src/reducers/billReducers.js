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
  POPULATE_BILL,
  NEW_BILL,
  SHOW_LOADING,

} from '../actions/types';

const INITIAL_STATE = {

  billId: '',

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

  discountPer: 0,

  editing: false,

  loading: true,

  savingLoader: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case CURRENT_ITEM_UPDATE:
      if (action.payload.prop == 'quantity' || action.payload.prop == 'rate') {
        if(isNaN(action.payload.value)) {
          return { ...state, error: 'Only numeric value is allowed'};
        }
      }

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

      const sum=0;
      items.forEach((item)=> sum+=item.total);


      return { ...state, items, currentItem: {...INITIAL_STATE.currentItem, id: state.currentItem.id+1 }, error:'', total:sum};

    case LOAD_SAVED_ITEMS:
      if (action.payload) {
        if (action.payload.items){
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
            discountPer: action.payload.discountPer,
            title: action.payload.title,
            loading: false,
            billId: action.payload.billId
          };
        } else {
          return { ...INITIAL_STATE, billId: state.billId, ...action.payload, loading:false };
        }
      } else return { ...INITIAL_STATE, billId: state.billId, loading: false};

    case CLEAR_BILL:
      return { ...INITIAL_STATE, billId: state.billId, title: state.title, loading:false };
    
    case NEW_BILL:
      return { ...INITIAL_STATE, loading:false };
    
    case TOP_UPDATES:
      return { ...state, [action.payload.prop]: action.payload.value };
    
    case DELETE_ROW:
      const rowId = action.payload;
      let items_temp_1 = [];
      for(let i=0; i<state.items.length; i++) {
        if (i<rowId) items_temp_1.push({...state.items[i]});
        else if (i>rowId) items_temp_1.push({...state.items[i], id:state.items[i].id-1});
      }

      const sum_1=0;
      items_temp_1.forEach((item)=> sum_1+=item.total);

      return { ...state, items:items_temp_1, currentItem: {...state.currentItem, id:items_temp_1.length +1}, total:sum_1}

    case EDIT_ROW:
      return { ...state, currentItem: {...state.items[action.payload]}, editing: true };
    
    case SAVE_EDIT_TO_LIST:
      const items_temp_2 = [];
    
      for (let i=0; i< state.items.length; i++) {
        if (state.currentItem.id !== i+1) items_temp_2.push({...state.items[i]});
        else items_temp_2.push({...state.currentItem});
      }
      const currentItem_temp_3 = { ...INITIAL_STATE.currentItem, id: items_temp_2.length + 1 };
      const sum_2=0;
      items_temp_2.forEach((item)=> sum_2+=item.total);
      return { ...state, currentItem: currentItem_temp_3, items: items_temp_2, editing: false, total:sum_2 };

    case SHOW_SAVING:
      return { ...state, savingLoader: action.payload };
    
    case SHOW_LOADING:
      return { ...state, loading: action.payload };

    case POPULATE_BILL:
      // console.log('reducer ma ', action.payload)
      return { ...INITIAL_STATE, loading: false, 
        currentItem: { ...INITIAL_STATE.currentItem, id: action.payload.items.length+1 },
        billId: action.payload.billId,
        items: action.payload.items, 
        title: action.payload.title, 
        discountPer: action.payload.discountPer, 
        total: action.payload.total
      };

    case SAVE_OTHERS:
    default:
      return state;
  }
}
  