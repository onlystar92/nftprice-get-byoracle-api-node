import axios from 'axios';

import { Transaction } from '../../models';
import { checkNFT } from '../../helpers';
import { verifySale } from '../../engine/verify';

export const addTransaction = async (req, res) => {
  try {
    const {
      transactionHash,
      contract,
      tokenId,
      timestamp,
      etherValue,
      chainId,
      from,
    } = req.body;

    const nft = await checkNFT(contract, chainId);
    const payload = {
      nftID: nft.id,
      tokenId,
      timestamp: new Date(timestamp * 1000),
      etherValue: parseFloat(etherValue),
      transactionHash,
      createdAt: new Date(),
      from,
      verificationStatus: 'Waiting check of 25 confirm blocks',
      chainId,
    };
    await Transaction.create(payload);

    // request verification
    var options = {
      method: 'POST',
      url: 'https://api.parsiq.net/v1/transaction-lifecycle',
      headers: {
        'X-API-KEY': process.env.PARSQI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: {
        tx_hash: transactionHash,
        callback_url: 'YOUR_WEBHOOK_URL',
        confirmations: 25,
        chain_id: chainId,
      },
    };
    const result = await axios(options);

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const verifyTransaction = async (req, res) => {
  try {
    const { transactionHash } = req.body;
    const { chainId } = req.params;

    const transaction = Transaction.findOne({
      where: {
        transactionHash,
        chainId,
      },
    });

    verificationStatus = await verifySale(transaction);

    await transaction.update({
      verificationStatus,
      ...transaction,
    });

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
