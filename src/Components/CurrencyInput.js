import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material/';
import { FIRST_CURRENCY, SECOND_CURRENCY, BUY, SELL, BYN } from '../constants';
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
    if (event.target.id === FIRST_CURRENCY) {
      dispatch(calculateStraightRate(currentValue));
    }
    if (event.target.id === SECOND_CURRENCY) {
      dispatch(calculateReverseRate(currentValue));
    }
  };

  switch (id) {
    case FIRST_CURRENCY:
      return (
        <TextField
          sx={{ m: 2 }}
          id={id}
          label={action === SELL ? currentCurrency : BYN}
          type='number'
          fullWidth
          helperText={`You give the next amount of ${action === SELL ? currentCurrency : BYN}`}
          InputLabelProps={{
            shrink: true,
          }}
          value={firstCurrency}
          onChange={handleChangeAmount}
        />
      );
    case SECOND_CURRENCY:
      return (
        <TextField
          sx={{ m: 2 }}
          id={id}
          label={action === BUY ? currentCurrency : BYN}
          type='number'
          fullWidth
          helperText={`You get the next amount of ${action === BUY ? currentCurrency : BYN}`}
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
