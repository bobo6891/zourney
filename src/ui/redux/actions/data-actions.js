import * as types from './action-types';
import { fetchData } from '../api';

const loadData = uid => dispatch => {
  dispatch({
    type: types.DATA_LOADING
  });
  return fetchData(uid).then(
    data => {
      dispatch({
        type: types.DATA_SUCCESSFULL,
        data
      });
    },
    err => {
      dispatch({
        type: types.DATA_FAILED,
        error: err
      });
    }
  );
};

export { loadData };

export default loadData;
