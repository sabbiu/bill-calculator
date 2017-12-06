import {
  SAMPLE_TEXT
} from './types';

// synchronous
export const sampleFunction = () => {
  return {
    type: SAMPLE_TEXT,
    payload: 'yo yo yo!'
  }
};

// asynchronous
// export const sampleFunction = () => {
//   return (dispatch) => {
//     setTimeout(()=> {
//       dispatch({
//         type: SAMPLE_TEXT,
//         payload: 'yo yo yo!'
//       });
//     }, 100)
//   }
// }
