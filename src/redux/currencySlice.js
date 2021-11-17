import { createSlice } from '@reduxjs/toolkit';
import { API_KEY, API_SOURCE, CONVERT, CURRENCIES } from '../API';

const initialState = {
  currencies: '',
  currentCurrency: '',
  action: 'buy',
  rate: '',
  firstCurrency: '',
  secondCurrency: '',
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrencies: (state, action) => {
      state.currencies = action.payload;
    },
    setCurrentCurrency: (state, action) => {
      state.currentCurrency = action.payload;
      state.firstCurrency = '';
      state.secondCurrency = '';
    },
    setAction: (state, action) => {
      state.action = action.payload;
      [state.firstCurrency, state.secondCurrency] = [state.secondCurrency, state.firstCurrency];
    },
    setRate: (state, action) => {
      state.rate = +action.payload.toFixed(4);
    },
    setFirstCurrency: (state, action) => {
      state.firstCurrency = action.payload;
    },
    setSecondCurrency: (state, action) => {
      state.secondCurrency = action.payload;
    },
    calculateStraightRate: (state, action) => {
      state.firstCurrency = action.payload;
      state.secondCurrency = +(action.payload * state.rate).toFixed(2);
    },
    calculateReverseRate: (state, action) => {
      state.secondCurrency = action.payload;
      state.firstCurrency = +(action.payload / state.rate).toFixed(2);
    },
  },
});

export const getCurrencies = () => (dispatch) => {
  (async function () {
    try {
      const response = await fetch(`${API_SOURCE}${CURRENCIES}?apiKey=${API_KEY}`);
      const result = await response.json();
      dispatch(setCurrencies(Object.values(result.results)));
    } catch (error) {
      console.log(error);
    }
  })();
};

export const getRate = (action, currentCurrency) => (dispatch) => {
  (async function () {
    try {
      const response = await fetch(
        `${API_SOURCE}${CONVERT}?q=${action === 'sell' ? currentCurrency : 'BYN'}_${
          action === 'buy' ? currentCurrency : 'BYN'
        }&compact=ultra&apiKey=${API_KEY}`
      );
      const result = await response.json();
      dispatch(setRate(Object.values(result)[0]));
    } catch (error) {
      console.log(error);
    }
  })();
};

export const {
  setCurrencies,
  setCurrentCurrency,
  setAction,
  setRate,
  setFirstCurrency,
  setSecondCurrency,
  calculateStraightRate,
  calculateReverseRate,
} = currencySlice.actions;

export const selectCurrencySlice = (state) => state.currency;

export default currencySlice.reducer;
