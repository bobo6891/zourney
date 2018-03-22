import * as types from '../actions/action-types';
import { getCategories, shuffleArray } from '../../utils/helper';

const defaultState = {
  data: {
    categories: [],
    items: []
  },
  dataLoading: false,
  error: null
};

export default function dataReducer(state = defaultState, action) {
  switch (action.type) {
    case types.DATA_LOADING: {
      return Object.assign({}, state, {
        dataLoading: true
      });
    }
    case types.DATA_SUCCESSFULL: {
      const data = action.data.map(item => {
        const answers = Object.keys(item).reduce((acc, key) => {
          if (key.split('_')[0] === 'answer') {
            if (item[key]) {
              acc.push(item[key]);
            }
            delete item[key];
          } 
          return acc;
        }, []);

        item.trueAnswer = answers[0];
        item.answers = shuffleArray(answers);
        return item;
      });
      const categories = getCategories(data);

      return Object.assign({}, state, {
        dataLoading: false,
        data: {
          categories,
          items: data
        },
        error: null
      });
    }
    case types.DATA_FAILED: {
      return Object.assign({}, state, {
        dataLoading: false,
        data: null,
        error: {
          statusCode: action.error.status,
          body: action.error.response.body
        }
      });
    }
    default: {
      return state;
    }
  }
}
