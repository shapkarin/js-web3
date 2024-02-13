import { useState } from 'react';
import Web3 from 'web3';

function useWallet() {
  const [account, setAccount] = useState('');
  const [ethBalance, setEthBalance] = useState('');
  const [usdtBalance, setUsdtBalance] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const httpGetRpcData = async (web3) => {
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        showSnackbar("MetaMask is locked or the user has not connected any accounts", 'error');
        return;
      }
      const account = accounts[0];
      setAccount(account);

      const ethBalance = await web3.eth.getBalance(account);
      setEthBalance(web3.utils.fromWei(ethBalance, 'ether'));

      const usdtContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
      const usdtContractABI = [
        { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "type": "function" },
      ];
      const usdtContract = new web3.eth.Contract(usdtContractABI, usdtContractAddress);
      const usdtBalance = await usdtContract.methods.balanceOf(account).call();
      setUsdtBalance(web3.utils.fromWei(usdtBalance, 'mwei'));
    } catch (error) {
      showSnackbar("Failed to fetch account details", 'error');
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        httpGetRpcData(web3);
        showSnackbar("Wallet connected successfully", 'success');
      } catch (error) {
        showSnackbar("Failed to connect the wallet", 'error');
      }
    } else {
      showSnackbar("Please install MetaMask to use this feature!", 'warning');
    }
  };

  return { account, ethBalance, usdtBalance, snackbar, connectWallet, handleCloseSnackbar };
}

export default useWallet;
