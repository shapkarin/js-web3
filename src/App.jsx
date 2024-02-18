import { Container, Button, Typography, Divider } from '@mui/material';
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
      <Divider sx={{ mt: 5, mb: 5 }} />
      <Button
        variant="contained"
        // the explicit path is slightly better than the relative path that's why I use condition
        href={process.env.NODE_ENV === "production" ? "/jsweb3/jsdoc" : "/jsdoc"}
      >
        JSDoc
      </Button>
    </Container>
  );
}

export default App;
