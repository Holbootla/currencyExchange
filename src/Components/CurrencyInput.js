import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material/';
import {
  calculateStraightRate,
  calculateReverseRate,
  selectCurrencySlice,
} from '../redux/currencySlice';

function CurrencyInput({ id }) {
  const dispatch = useDispatch();
  const { currentCurrency, action, firstCurrency, secondCurrency } =
    useSelector(selectCurrencySlice);

  const handleChangeAmount = (event) => {
    const currentValue = event.target.value;
    if (event.target.id === 'firstCurrency') {
      dispatch(calculateStraightRate(currentValue));
    }
    if (event.target.id === 'secondCurrency') {
      dispatch(calculateReverseRate(currentValue));
    }
  };

  switch (id) {
    case 'firstCurrency':
      return (
        <TextField
          sx={{ m: 2 }}
          id='firstCurrency'
          label={action === 'sell' ? currentCurrency : 'BYN'}
          type='number'
          fullWidth
          helperText={`You give the next amount of ${action === 'sell' ? currentCurrency : 'BYN'}`}
          InputLabelProps={{
            shrink: true,
          }}
          value={firstCurrency}
          onChange={handleChangeAmount}
        />
      );
    case 'secondCurrency':
      return (
        <TextField
          sx={{ m: 2 }}
          id='secondCurrency'
          label={action === 'buy' ? currentCurrency : 'BYN'}
          type='number'
          fullWidth
          helperText={`You get the next amount of ${action === 'buy' ? currentCurrency : 'BYN'}`}
          InputLabelProps={{
            shrink: true,
          }}
          value={secondCurrency}
          onChange={handleChangeAmount}
        />
      );

    default:
      return null;
  }
}

export default CurrencyInput;
