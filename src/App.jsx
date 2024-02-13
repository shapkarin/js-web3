import { Container, Button, Typography } from '@mui/material';
import SnackbarComponent from './Components/SnackbarComponent';
import useWallet from './Hooks/useWallet';

function App() {
  const { account, ethBalance, usdtBalance, snackbar, connectWallet, handleCloseSnackbar } = useWallet();

  return (
    <Container>
      <Button variant="contained" onClick={connectWallet}>Connect MetaMask</Button>
      {account && (
        <div>
          <Typography variant="h6">Account: {account}</Typography>
          <Typography variant="h6">ETH: {ethBalance}</Typography>
          <Typography variant="h6">USDT: {usdtBalance}</Typography>
        </div>
      )}
      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        severity={'success'}
        handleClose={handleCloseSnackbar}
      />
    </Container>
  );
}

export default App;
