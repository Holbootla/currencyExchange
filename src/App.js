import { useSelector } from 'react-redux';
import './index.css';
import { Container, Typography } from '@mui/material/';
import { selectCurrencySlice } from './redux/currencySlice';
import CurrencyList from './Components/CurrencyList';
import MarketAction from './Components/MarketAction';
import CurrencyInput from './Components/CurrencyInput';
import Rate from './Components/Rate';

function App() {
  const { currentCurrency } = useSelector(selectCurrencySlice);

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
        <CurrencyList />
        <MarketAction />
      </div>

      {currentCurrency && (
        <>
          <Rate />
          <CurrencyInput id='firstCurrency' />
          <CurrencyInput id='secondCurrency' />
        </>
      )}
    </Container>
  );
}

export default App;
