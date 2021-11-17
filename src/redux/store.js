import { createStore, combineReducers } from 'redux';
import { currencyReducer } from './currencyReducer';

const rootReducer = combineReducers({
  currency: currencyReducer,
});

const store = createStore(rootReducer);

export default store;
