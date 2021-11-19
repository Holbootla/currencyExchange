import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material/';
import { getCurrencies, setCurrentCurrency, selectCurrencySlice } from '../redux/currencySlice';

function CurrencyList() {
  const dispatch = useDispatch();
  const { currencies, currentCurrency } = useSelector(selectCurrencySlice);

  const handleChangeCurrentCurrency = (event) => {
    const currentValue = event.target.value;
    dispatch(setCurrentCurrency(currentValue));
  };

  useEffect(() => {
    dispatch(getCurrencies());
  }, [dispatch]);

  return (
    <FormControl sx={{ m: 3, minWidth: 100 }}>
      <InputLabel id='currency-label'>Currency</InputLabel>
      <Select
        labelId='currency-label'
        id='currency'
        value={currentCurrency}
        label='Current currency'
        onChange={handleChangeCurrentCurrency}
      >
        {currencies &&
          currencies.map((el) => (
            <MenuItem value={el.id} key={el.id}>
              {`${el.currencyName} (${el.id})`}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>Choose you currency</FormHelperText>
    </FormControl>
  );
}

export default CurrencyList;
