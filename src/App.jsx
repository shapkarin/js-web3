import React, { useState } from 'react';
import { Button, Typography, Container, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Web3 from 'web3';

/**
 * Custom Alert component using Material UI for displaying messages.
 *
 * @component
 * @param {object} props - Props for MuiAlert component.
 * @param {React.Ref} ref - Ref forwarding for the Alert component.
 * @returns {JSX.Element} MuiAlert component with filled variant and elevation.
 */
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function App() {
  const [account, setAccount] = useState('');
  const [ethBalance, setEthBalance] = useState('');
  const [usdtBalance, setUsdtBalance] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  /**
   * @param {React.SyntheticEvent} event The event that triggers the close.
   * @param {string} reason The reason for the Snackbar close action.
   */
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  /**
   * Connects to the Ethereum blockchain, retrieves and sets the user's account,
   * ETH balance, and USDT balance. This function demonstrates the use of Web3.js
   * to interact with the Ethereum network, including account retrieval and balance
   * queries for both Ethereum and tokens (e.g., USDT).
   * 
   * For a comprehensive guide on using Web3.js, including methods like `getAccounts`,
   * `getBalance`, and interacting with contracts, see the Web3.js documentation.
   * 
   * @function httpGetRpcData
   * @see {@link https://web3js.readthedocs.io/} for the Web3.js documentation.
   * @async
   * @param {Web3} web3 An instance of the Web3 class.
   */
    const httpGetRpcData = async (web3) => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        setSnackbarMessage("MetaMask is locked or the user has not connected any accounts");
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        return;
      }
      const account = accounts[0];
      setAccount(account);

      const ethBalance = await web3.eth.getBalance(account);
      setEthBalance(web3.utils.fromWei(ethBalance, 'ether'));

      const usdtContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
      const usdtContractABI = [
        {
          "constant":true,
          "inputs":[{"name":"_owner","type":"address"}],
          "name":"balanceOf",
          "outputs":[{"name":"balance","type":"uint256"}],
          "type":"function"
        },
      ];
      const usdtContract = new web3.eth.Contract(usdtContractABI, usdtContractAddress);
      const usdtBalance = await usdtContract.methods.balanceOf(account).call();
      setUsdtBalance(web3.utils.fromWei(usdtBalance, 'mwei'));
    };

  /**
   * Initiates connection to the user's MetaMask wallet using the Ethereum provider injected into the browser.
   * This function demonstrates requesting account access via MetaMask and updating the UI based on the connection status.
   * 
   * For more information on using Ethereum with Web3.js and handling user accounts, refer to the following documentation:
   * - Web3.js documentation: {@link https://web3js.readthedocs.io/}
   * - Ethereum Provider API: {@link https://eips.ethereum.org/EIPS/eip-1193}
   * 
   * This function also demonstrates error handling for when the MetaMask extension is not found, prompting the user to install MetaMask.
   * 
   * @async
   */
  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        httpGetRpcData(web3);
        setSnackbarMessage("Wallet connected successfully");
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      } catch (error) {
        setSnackbarMessage("Failed to connect the wallet");
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } else {
      setSnackbarMessage("Please install MetaMask to use this feature!");
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
    }
  };

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
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
