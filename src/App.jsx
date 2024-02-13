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
          <Typography variant="h6">ETH Balance: {ethBalance}</Typography>
          <Typography variant="h6">USDT Balance: {usdtBalance}</Typography>
        </div>
      )}
      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={handleCloseSnackbar}
      />
    </Container>
  );
}

export default App;
