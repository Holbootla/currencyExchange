import { useState } from 'react';
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

function App() {
  const currencies = ['USD', 'EUR', 'RUB'];
  const [currentCurrency, setCurrentCurrency] = useState('');
  const handleChange = (event) => {
    setCurrentCurrency(event.target.value);
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
            onChange={handleChange}
          >
            {currencies.map((el) => (
              <MenuItem value={el} key={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Choose you currency</FormHelperText>
        </FormControl>

        <FormControl sx={{ m: 2 }} component='fieldset'>
          <FormLabel component='legend'>What to do</FormLabel>
          <RadioGroup row aria-label='action' name='row-radio-buttons-group'>
            <FormControlLabel value='buy' control={<Radio />} label='Buy' />
            <FormControlLabel value='sale' control={<Radio />} label='Sale' />
          </RadioGroup>
        </FormControl>
      </div>

      <div className='rate'>
        <Typography variant='h5' sx={{ m: 2 }}>
          Current rate: 123123
        </Typography>
      </div>
      <TextField
        sx={{ m: 2 }}
        id='outlined-number'
        label={currentCurrency}
        type='number'
        fullWidth
        helperText={`You give the next amount of ${currentCurrency}`}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        sx={{ m: 2 }}
        id='outlined-number'
        label={currentCurrency}
        type='number'
        fullWidth
        helperText={`You get the next amount of ${currentCurrency}`}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Container>
  );
}

export default App;
