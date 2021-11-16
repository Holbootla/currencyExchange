import { useState, useEffect } from 'react';
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

function App() {
  const [currencies, setCurrencies] = useState('');
  const [currentCurrency, setCurrentCurrency] = useState('');
  const [action, setAction] = useState('buy');
  const [rate, setRate] = useState('');
  const [firstCurrency, setFirstCurrency] = useState(0);
  const [secondCurrency, setSecondCurrency] = useState(0);

  const getCurrencies = async () => {
    try {
      const response = await fetch(`${API_SOURCE}${CURRENCIES}?apiKey=${API_KEY}`);
      const result = await response.json();
      setCurrencies(Object.values(result.results));
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
      setRate(Object.values(result)[0]);
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
    setCurrentCurrency(currentValue);
  };

  const handleChangeAction = (event) => {
    setAction(event.target.value);
    const tempCurrency = firstCurrency;
    setFirstCurrency(secondCurrency);
    setSecondCurrency(tempCurrency);
  };

  const handleChangeAmount = (event) => {
    if (event.target.id === 'firstCurrency') {
      setFirstCurrency(event.target.value);
      setSecondCurrency(event.target.value * rate);
    }
    if (event.target.id === 'secondCurrency') {
      setSecondCurrency(event.target.value);
      setFirstCurrency(event.target.value * rate);
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
