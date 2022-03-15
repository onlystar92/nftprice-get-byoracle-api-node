import axios from 'axios';
import { utils } from 'web3';

import { Order, Sale } from '../../models';
import { successResponse, errorResponse, checkNFT } from '../../helpers';
import { addSaleWithVerification } from '../../engine/sale';

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
      const saleId = await addSaleWithVerification(
        nft.id,
        tokenId,
        new Date(),
        order.etherValue,
        transactionHash,
        from,
        to,
        false,
        true
      );

      // request verification
      const callBackURL = `${process.env.API_END_POINT}/api/v1/verifytransaction?api_key=${process.env.DROP_API_KEY}&saleId=${saleId}`;

      const options = {
        method: 'POST',
        url: 'https://api.parsiq.net/v1/transaction-lifecycle',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PARSIQ_API_KEY}`,
        },
        data: {
          tx_hash: transactionHash,
          callback_url: callBackURL,
          confirmations: 12,
          chain_id: process.env.PARSIQ_CHAIN_ID,
        },
      };

      try {
        const parsiqRes = await axios.request(options);
        console.log('=======>parsiq verify API request success');
      } catch (e) {
        console.log('=======>parsiq verify API request failed');
      }
    }

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const verifyTransaction = async (req, res) => {
  try {
    const { block_timestamp } = req.body;
    const { saleId } = req.query;

    const sale = await Sale.findbyP(saleId);

    if (sale !== null) {
      console.log('verifyTransaction is calling');

      const blockTimestamp = new Date(block_timestamp * 1000);
      const sameTokenIDSold = await checkIfSameTokenIdIsSoldWithADay(
        sale.nftId,
        sale.tokenId,
        blockTimestamp
      );

      await sale.update({
        ...sale,
        blockConfirmed: true,
        sameTokenIDSold,
        blockTimestamp,
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
      contract,
      chainId,
      tokenId,
      blockTimestamp,
      etherValue,
      from,
      to,
    } = req.body;

    const nft = await checkNFT(contract, chainId);

    const sale = await Sale.findOne({
      where: { transactionHash, nftId: nft.id },
    });

    if (sale !== null) {
      return errorResponse(req, res, 'Sale already exists ');
    }

    await addSaleWithVerification(
      nftId,
      tokenId,
      blockTimestamp,
      etherValue,
      transactionHash,
      from,
      to,
      true,
      false // sameTokenIDSold
    );

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
