import NFTOracleABI from '../constants/abis/NFTOracleABI.json';

require('dotenv').config();

const Web3 = require('web3');

const web3 = new Web3(process.env.RPC_URL);

const writeUSDPriceIntoContract = async (contract, usdPrice) => {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const walletAddress = process.env.WALLET_ADDRESS;
  const privateKey = process.env.PRIVATE_KEY;
  const abi = NFTOracleABI;

  const nftoracle = new web3.eth.Contract(abi, contractAddress);

  const query = nftoracle.methods.setPrice(contract, usdPrice);
  const encodedABI = query.encodeABI();
  const tx = {
    from: walletAddress,
    to: contractAddress,
    gas: 2000000,
    data: encodedABI,
  };
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  console.log(account);
  web3.eth.getBalance(walletAddress).then(console.log);

  web3.eth.accounts.signTransaction(tx, privateKey).then((signed) => {
    web3.eth
      .sendSignedTransaction(signed.rawTransaction)
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log(
          `=> confirmation: ${confirmationNumber}, receipt: ${receipt}`
        );
      })
      .on('transactionHash', (hash) => {
        console.log('=> hash', hash);
      })
      .on('receipt', (receipt) => {
        console.log('=> reciept', receipt);
      })
      .on('error', console.error);
  });
};

module.exports = {
  writeUSDPriceIntoContract,
};
