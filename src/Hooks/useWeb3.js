import { useState, useEffect } from 'react';
import Web3 from 'web3';

/**
 * A custom React hook that initializes and provides a Web3 instance.
 * This hook checks if the Ethereum object is available in the window (injected by Ethereum wallets like MetaMask)
 * and then creates a Web3 instance using it. This instance can be used to interact with the Ethereum blockchain.
 * 
 * @returns {Web3|null} The Web3 instance if the Ethereum object is available, otherwise `null`.
 * 
 * @see {@link https://web3js.readthedocs.io/} for the Web3.js documentation.
 */
function useWeb3() {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  return web3;
}

export default useWeb3;
