import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material/';
import { BUY, SELL } from '../constants';
import { setAction, selectCurrencySlice } from '../redux/currencySlice';

function MarketAction() {
  const dispatch = useDispatch();
  const { action } = useSelector(selectCurrencySlice);

  const handleChangeAction = (event) => {
    const currentValue = event.target.value;
    dispatch(setAction(currentValue));
  };
  return (
    <FormControl sx={{ m: 2 }} component='fieldset'>
      <FormLabel component='legend'>What to do</FormLabel>
      <RadioGroup
        row
        aria-label='action'
        name='row-radio-buttons-group'
        onChange={handleChangeAction}
        value={action}
      >
        <FormControlLabel value={BUY} control={<Radio />} label='Buy' />
        <FormControlLabel value={SELL} control={<Radio />} label='Sell' />
      </RadioGroup>
    </FormControl>
  );
}

export default MarketAction;
