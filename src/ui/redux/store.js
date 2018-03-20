import { applyMiddleware, createStore } from 'redux';
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

import reducers from './reducers/reducers';

export default createStore(reducers, applyMiddleware(thunk, reduxImmutableStateInvariant()));
