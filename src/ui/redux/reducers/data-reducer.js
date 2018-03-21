import * as types from '../actions/action-types';

const shuffle = arr => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const itemAtIndex = arr[randomIndex];

    arr[randomIndex] = arr[i];
    arr[i] = itemAtIndex;
  }
  return arr;
};

const defaultState = {
  data: null,
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
        item.answers = shuffle(answers);
        return item;
      });

      action.data = data;
      return Object.assign({}, state, {
        dataLoading: false,
        data: action.data,
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
