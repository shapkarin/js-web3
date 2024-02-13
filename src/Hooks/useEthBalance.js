/**
 * Custom hook to fetch and display the Ethereum (ETH) balance of a specified account.
 * This hook listens for changes in the provided `web3` instance and `account` address,
 * automatically updating the ETH balance when either changes.
 * 
 * The ETH balance is fetched using the `web3.eth.getBalance` method, and the returned value
 * is converted from Wei to Ether for readability.
 * 
 * @param {Web3} web3 - The Web3 instance used to interact with the Ethereum blockchain.
 * @param {string} account - The Ethereum account address whose balance is to be fetched.
 * @returns {string} The current ETH balance of the specified account, in Ether units.
 * 
 * @see {@link https://web3js.readthedocs.io/en/v1.0/web3-eth.html#getbalance} Web3.js documentation for `getBalance`.
 * @see {@link https://web3js.readthedocs.io/en/v1.0/web3-utils.html#fromwei} Web3.js documentation for `fromWei` utility function.
 * 
 */
import { useState, useEffect } from 'react';

function useEthBalance(web3, account) {
  const [ethBalance, setEthBalance] = useState('');

  useEffect(() => {
    const fetchEthBalance = async () => {
      if (web3 && account) {
        const balance = await web3.eth.getBalance(account);
        setEthBalance(web3.utils.fromWei(balance, 'ether'));
      }
    };

    fetchEthBalance();
  }, [web3, account]);

  return ethBalance;
}

export default useEthBalance;