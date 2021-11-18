import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material/';
import { getRate, selectCurrencySlice } from '../redux/currencySlice';

function Rate() {
  const dispatch = useDispatch();
  const { currentCurrency, action, rate } = useSelector(selectCurrencySlice);

  useEffect(() => {
    dispatch(getRate({ action, currentCurrency }));
  }, [currentCurrency, action, dispatch]);

  return (
    <Typography variant='h5' sx={{ m: 2 }}>
      Current rate: {rate}
    </Typography>
  );
}

export default Rate;
