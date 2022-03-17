import axios from 'axios';

// Parsiq chainId
const ChainIds = {
  1: 'eip155:1', // ethereum mainnet
  4: 'eip155:4', // ethereum rinkeby
};

// request to verify if tx has enough block confirms
export const requestVerifyTxBlockConfirm = async (
  tx_hash,
  callback_url,
  chainId = '1',
  confirmations = 12
) => {
  const options = {
    method: 'POST',
    url: 'https://api.parsiq.net/v1/transaction-lifecycle',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PARSIQ_API_KEY}`,
    },
    data: {
      tx_hash,
      callback_url,
      confirmations,
      chain_id: ChainIds[chainId],
    },
  };

  const res = await axios.request(options);

  if (res.code === 200) {
    return false;
  }
  return true;
};
