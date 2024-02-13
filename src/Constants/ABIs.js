/**
 * CONTRACT_ABI is essential for interacting with Ethereum smart contracts from the client-side
 * using the Web3.js library. It stands for Application Binary Interface and acts as a bridge 
 * between your JavaScript application and the smart contract on the Ethereum blockchain.
 * 
 * The ABI is a JSON array that details the contract's functions, including their names, input 
 * parameters, output types, and event signatures. This information allows Web3.js to correctly
 * format calls to the contract's functions and parse their outputs. Essentially, the ABI tells 
 * Web3.js how to encode function calls into the low-level data formats that the Ethereum network 
 * understands, and how to decode data returned from the blockchain back into JavaScript types.
 * 
 * How to Use:
 * To interact with a smart contract from your web application, you first need the contract's ABI 
 * and its deployed address. With these, you can create an instance of the contract in your 
 * application, enabling you to call its methods or listen for events it emits.
 * 
 * Example:
 * const myContractInstance = new web3.eth.Contract(CONTRACT_ABI, contractAddress);
 * 
 * With `myContractInstance`, you can now interact with the smart contract: calling its read-only 
 * methods, executing transactions that alter its state, or subscribing to events. This interaction
 * happens directly from the user's browser, providing a seamless integration between your web 
 * application and the Ethereum blockchain.
 * 
 * Note: The ABI must precisely match the smart contract you wish to interact with, as it is 
 * contract-specific. An incorrect or outdated ABI will result in errors when attempting to 
 * communicate with the contract.
 * 
 * @see {@link https://web3js.readthedocs.io/en/v1.0/web3-eth.html#getbalance} Web3.js documentation for `getBalance`.
 */
export const USDT_CONTRACT_ABI = [{
  "constant": true,
  "inputs": [{
      "name": "_owner",
      "type": "address"
  }],
  "name": "balanceOf",
  "outputs": [{
      "name": "balance",
      "type": "uint256"
  }],
  "type": "function"
}, ];