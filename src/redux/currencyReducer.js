const initialState = {
  currencies: '',
  currentCurrency: '',
  action: 'buy',
  rate: '',
  firstCurrency: '',
  secondCurrency: '',
};

export function currencyReducer(state = initialState, action) {
  switch (action.type) {
    case 'setCurrencies':
      return { ...state, currencies: action.payload };
    case 'setCurrentCurrency':
      return { ...state, currentCurrency: action.payload };
    case 'setAction':
      return { ...state, action: action.payload };
    case 'setRate':
      return { ...state, rate: action.payload };
    case 'setFirstCurrency':
      return { ...state, firstCurrency: action.payload };
    case 'setSecondCurrency':
      return { ...state, secondCurrency: action.payload };
    default:
      return state;
  }
}

export const setCurrencies = (payload) => ({
  type: 'setCurrencies',
  payload,
});
export const setCurrentCurrency = (payload) => ({ type: 'setCurrentCurrency', payload });
export const setAction = (payload) => ({
  type: 'setAction',
  payload,
});
export const setRate = (payload) => ({ type: 'setRate', payload });
export const setFirstCurrency = (payload) => ({ type: 'setFirstCurrency', payload });
export const setSecondCurrency = (payload) => ({ type: 'setSecondCurrency', payload });
