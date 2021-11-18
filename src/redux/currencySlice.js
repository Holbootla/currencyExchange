import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../API';
import { BUY } from '../constants';

const initialState = {
  currencies: '',
  currentCurrency: '',
  action: BUY,
  rate: '',
  firstCurrency: '',
  secondCurrency: '',
};

export const getCurrencies = createAsyncThunk('currency/getCurrencies', async () => {
  const api = new Api();
  return await api.getCurrencies();
});

export const getRate = createAsyncThunk('currency/getRate', async ({ action, currentCurrency }) => {
  const api = new Api();
  return await api.getRate(action, currentCurrency);
});

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrentCurrency: (state, action) => {
      state.currentCurrency = action.payload;
      state.firstCurrency = '';
      state.secondCurrency = '';
    },
    setAction: (state, action) => {
      state.action = action.payload;
      [state.firstCurrency, state.secondCurrency] = [state.secondCurrency, state.firstCurrency];
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
  extraReducers: {
    [getCurrencies.fulfilled]: (state, action) => {
      state.currencies = Object.values(action.payload);
    },
    [getRate.fulfilled]: (state, action) => {
      state.rate = +Object.values(action.payload)[0].toFixed(4);
    },
  },
});

export const { setCurrentCurrency, setAction, calculateStraightRate, calculateReverseRate } =
  currencySlice.actions;

export const selectCurrencySlice = (state) => state.currency;

export default currencySlice.reducer;
