import axios from 'axios';
import { utils } from 'web3';

import { Order, Sale } from '../../models';
import { successResponse, errorResponse, checkNFT } from '../../helpers';

export const addOrder = async (req, res) => {
  try {
    const { transactionHash, contract, etherValue, chainId, maker, taker } =
      req.body;

    const nft = await checkNFT(contract, chainId);

    const sameOrder = await Order.findOne({
      where: { transactionHash, nftId: nft.id },
    });

    if (sameOrder == null) {
      console.log('addOrder');

      const payload = {
        transactionHash,
        etherValue: utils.fromWei(etherValue),
        from: maker,
        to: taker,
        nftId: nft.id,
      };
      await Order.create(payload);
    }

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addTransfer = async (req, res) => {
  try {
    const { transactionHash, contract, from, to, chainId, tokenId } = req.body;

    const nft = await checkNFT(contract, chainId);
    const order = await Order.findOne({
      where: {
        transactionHash,
        from,
        to,
        nftId: nft.id,
      },
    });

    const sameSale = await Sale.findOne({
      where: {
        tokenId,
        transactionHash,
        from,
        to,
        nftId: nft.id,
      },
    });

    if (order != null && sameSale == null) {
      const payload = {
        nftId: nft.id,
        tokenId,
        blockTimestamp: new Date(),
        etherValue: order.etherValue,
        transactionHash,
        from,
        to,
        outlier: false,
        sameTokenIDSold: true,
        blockConfirmed: false,
      };

      await Sale.create(payload);

      // request verification
      const callBackURL = `${process.env.API_END_POINT}/api/v1/verifytransaction?api_key=${process.env.DROP_API_KEY}&nftId=${nft.id}&tokenId=${tokenId}`;

      console.log('request tx verification with confirm blocks', callBackURL);

      var options = {
        method: 'POST',
        url: 'https://api.parsiq.net/v1/transaction-lifecycle',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PARSIQ_API_KEY}`,
        },
        body: {
          tx_hash: transactionHash,
          callback_url: callBackURL,
          confirmations: 25,
          chain_id: process.env.PARSIQ_CHAIN_ID,
        },
      };
      try {
        const result = await axios(options);
        // console.log('====>result', result);
      } catch (e) {
        console.log(e);
        console.log(e);
      }
    }

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const verifyTransaction = async (req, res) => {
  try {
    const { transaction_hash, block_timestamp } = req.body;
    const { nftId, tokenId } = req.query;
    const blockTime = new Date(block_timestamp * 1000);

    const sale = await Sale.findOne({
      where: {
        nftId,
        tokenId,
        transactionHash: transaction_hash,
      },
    });

    if (sale !== null) {
      console.log('verifyTransaction is calling');

      /////////////// check if same token is sold within last 24 hours
      const ONE_HOUR = 60 * 60 * 1000; /* ms */
      const dateOneHourAgo = new Date(blockTime.getTime() - ONE_HOUR);

      const sameTokneIDSales = await Sale.findOne({
        where: {
          nftId,
          tokenId,
          blockTimestamp: {
            $between: [dateOneHourAgo, blockTime],
          },
        },
        order: [['blockTimestamp', 'DESC']],
      });

      //////////////////////////////

      await sale.update({
        ...sale,
        blockConfirmed: true,
        sameTokenIDSold: sameTokneIDSales !== null,
        blockTimestamp: blockTime,
      });
    }

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const allSales = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 100;
    const { rows } = await Sale.findAndCountAll({
      order: [['createdAt', 'DESC']],
      offset: (page - 1) * limit,
      limit,
    });

    return successResponse(req, res, rows);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addSale = async (req, res) => {
  try {
    const {
      transactionHash,
      tokenId,
      blockTimestamp,
      etherValue,
      from,
      to,
      outlier,
      blockConfirmed,
      sameTokenIDSold,
      nftId,
    } = req.body;

    const sale = await Sale.findOne({
      where: { transactionHash, nftId },
    });

    if (sale !== null) {
      return errorResponse(req, res, 'Sale already exists ');
    }

    const payload = {
      transactionHash,
      nftId,
      tokenId,
      blockTimestamp,
      etherValue,
      from,
      to,
      blockConfirmed,
      sameTokenIDSold,
      outlier,
    };

    await Sale.create(payload);

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
