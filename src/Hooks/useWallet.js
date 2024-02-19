import { useState, useEffect, useCallback } from 'react';
import useSnackbar from './useSnackbar';
import useWeb3 from './useWeb3';
import useEthBalance from './useEthBalance';
import useTokenBalance from './useTokenBalance';
import { USDT_CONTRACT_ADDRESS, USDT_CONTRACT_ABI } from '../Constants/index';

function useWallet() {
  const [account, setAccount] = useState('');
  const { snackbar, showSnackbar, handleCloseSnackbar } = useSnackbar();
  const web3 = useWeb3();

  const ethBalance = useEthBalance(web3, account);
  const usdtBalance = useTokenBalance(web3, account, USDT_CONTRACT_ADDRESS, USDT_CONTRACT_ABI);

  /**
  * Attempts to connect to the user's Ethereum wallet using MetaMask. This function triggers MetaMask's account access request,
  * then fetches and sets the user's first account if successful. Displays appropriate feedback via Snackbar based on the outcome.
  * 
  * Utilizes `window.ethereum.request` to request access to the user's Ethereum accounts. If access is granted, it then uses
  * `web3.eth.getAccounts` to fetch the list of accounts associated with the user's wallet. The first account in the array is considered
  * the user's primary account and is stored for further use.
  * 
  * @see {@link https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts} for MetaMask's `eth_requestAccounts` method.
  * @see {@link https://docs.web3js.org/libdocs/Web3Eth#getaccounts} for Web3.js `getAccounts` method documentation.
  * @see EIP-1193 for the Ethereum provider JavaScript API {@link https://eips.ethereum.org/EIPS/eip-1193}.
  * 
  * This function should be wrapped in `useCallback` to ensure it does not change between renders unless its dependencies change.
  *  
  * @async
  * @function connectWallet
  * @returns {Promise<void>} A promise that resolves when the connection attempt has been made.
 */
  const connectWallet = async () => {
    if (!web3) {
      showSnackbar("Please install MetaMask to use this feature!", 'warning');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        showSnackbar("Wallet connected successfully", 'success');
      } else {
        showSnackbar("MetaMask is locked or the user has not connected any accounts", 'error');
      }
    } catch (error) {
      showSnackbar("Failed to connect the wallet", 'error');
    }
  };


  useEffect(() => {
    const fetchAccountData = async () => {
      if (!web3) {
        showSnackbar("Please install MetaMask to use this feature!", 'warning');
        return;
      }

      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
          showSnackbar("MetaMask is locked or the user has not connected any accounts", 'error');
          return;
        }
        setAccount(accounts[0]);
        showSnackbar("Wallet connected successfully", 'success');
      } catch (error) {
        showSnackbar("Failed to connect the wallet", 'error');
      }
    };

    fetchAccountData();
  }, [web3]);

  return { connectWallet, account, ethBalance, usdtBalance, snackbar, handleCloseSnackbar };
}

export default useWallet;
