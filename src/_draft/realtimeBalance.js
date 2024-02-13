import Web3 from 'web3';

const CONNECTEC_ACCOUNT = ''

const webSocketProvider = new Web3.providers.WebsocketProvider(process.env.REACT_APP_INFURA_SOCKET);
const web3 = new Web3(webSocketProvider);

const myWalletAddress = CONNECTEC_ACCOUNT.toLowerCase();

web3.eth.subscribe('newBlockHeaders', (error, blockHeader) => {
    if (error) {
        console.error('Error subscribing to newBlockHeaders:', error);
        return;
    }
    web3.eth.getBlock(blockHeader.number, true, (error, block) => {
        if (error) {
            console.error('Error fetching block:', error);
            return;
        }
        block.transactions.forEach(tx => {
            // Check if this transaction involves your wallet address
            if (tx.from.toLowerCase() === myWalletAddress || tx.to.toLowerCase() === myWalletAddress) {
                fetchAndLogCurrentBalance(myWalletAddress);
            }
        });
    });
});

const fetchAndLogCurrentBalance = async (address) => {
    try {
        const balanceWei = await web3.eth.getBalance(address);
        const balanceEther = web3.utils.fromWei(balanceWei, 'ether');
        console.log(`Current balance of ${address} is: ${balanceEther} ETH`);
    } catch (error) {
        console.error('Error fetching current balance:', error);
    }
};
