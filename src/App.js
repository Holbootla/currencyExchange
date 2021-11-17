import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@mui/material/';
import { API_KEY, API_SOURCE, CONVERT, CURRENCIES } from './API';
import {
  setCurrencies,
  setCurrentCurrency,
  setAction,
  setRate,
  setFirstCurrency,
  setSecondCurrency,
} from './redux/currencyReducer';

function App() {
  const dispatch = useDispatch();
  const { currencies, currentCurrency, action, rate, firstCurrency, secondCurrency } = useSelector(
    (state) => state.currency
  );

  const getCurrencies = async () => {
    try {
      const response = await fetch(`${API_SOURCE}${CURRENCIES}?apiKey=${API_KEY}`);
      const result = await response.json();
      dispatch(setCurrencies(Object.values(result.results)));
    } catch (error) {
      console.log(error);
    }
  };

  const getRate = async () => {
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
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  useEffect(() => {
    getRate();
  }, [currentCurrency, action]);

  const handleChangeCurrentCurrency = (event) => {
    const currentValue = event.target.value;
    dispatch(setCurrentCurrency(currentValue));
    dispatch(setFirstCurrency(''));
    dispatch(setSecondCurrency(''));
  };

  const handleChangeAction = (event) => {
    dispatch(setAction(event.target.value));
    const tempCurrency = firstCurrency;
    dispatch(setFirstCurrency(secondCurrency));
    dispatch(setSecondCurrency(tempCurrency));
  };

  const handleChangeAmount = (event) => {
    if (event.target.id === 'firstCurrency') {
      dispatch(setFirstCurrency(event.target.value));
      dispatch(setSecondCurrency(event.target.value * rate));
    }
    if (event.target.id === 'secondCurrency') {
      dispatch(setSecondCurrency(event.target.value));
      dispatch(setFirstCurrency(event.target.value * rate));
    }
  };

  return (
    <Container
      maxWidth='sm'
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant='h2'>Currency exchange</Typography>
      <div>
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

        <FormControl sx={{ m: 2 }} component='fieldset'>
          <FormLabel component='legend'>What to do</FormLabel>
          <RadioGroup
            row
            aria-label='action'
            name='row-radio-buttons-group'
            onChange={handleChangeAction}
            value={action}
          >
            <FormControlLabel value='buy' control={<Radio />} label='Buy' />
            <FormControlLabel value='sell' control={<Radio />} label='Sell' />
          </RadioGroup>
        </FormControl>
      </div>

      {currentCurrency && (
        <>
          <Typography variant='h5' sx={{ m: 2 }}>
            Current rate: {rate}
          </Typography>
          <TextField
            sx={{ m: 2 }}
            id='firstCurrency'
            label={action === 'sell' ? currentCurrency : 'BYN'}
            type='number'
            fullWidth
            helperText={`You give the next amount of ${
              action === 'sell' ? currentCurrency : 'BYN'
            }`}
            InputLabelProps={{
              shrink: true,
            }}
            value={firstCurrency}
            onChange={handleChangeAmount}
          />
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
        </>
      )}
    </Container>
  );
}

export default App;
