import { utils } from 'web3';

import { Sale } from '../../models';
import { successResponse, errorResponse, checkNFT } from '../../helpers';
import {
  checkIfSameTokenIdIsSoldWithADay,
  addSaleWithVerification,
} from '../../engine/sale';
import { requestVerifyTxBlockConfirm } from '../../engine/parsiq';
import { updateTruncatedMean } from '../../engine/truncate';

export const addSaleFromParsiq = async (req, res) => {
  try {
    const {
      transactionHash,
      contract,
      from,
      to,
      chainId,
      tokenId,
      etherValue,
      datetime,
    } = req.body;

    const nft = await checkNFT(contract, chainId);

    const sameSale = await Sale.findOne({
      where: {
        tokenId,
        transactionHash,
        from,
        to,
        nftId: nft.id,
      },
    });

    if (sameSale == null) {
      await updateTruncatedMean(nft.id);

      const sameTokenIDSold = await checkIfSameTokenIdIsSoldWithADay(
        nft.id,
        tokenId,
        new Date(datetime)
      );

      const blockConfirmed = await requestVerifyTxBlockConfirm(
        transactionHash,
        `${process.env.API_END_POINT}/api/v1/verifytransaction?api_key=${process.env.DROP_API_KEY}&saleId=${saleId}`,
        chainId
      );

      const saleId = await addSaleWithVerification(
        nft.id,
        tokenId,
        new Date(datetime),
        utils.fromWei(etherValue),
        transactionHash,
        from,
        to,
        blockConfirmed, // block confirm
        sameTokenIDSold
      );
    }

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const verifyTransaction = async (req, res) => {
  try {
    const { saleId } = req.query;

    const sale = await Sale.findbyP(saleId);

    if (sale !== null) {
      console.log('verify blocks is calling');

      await sale.update({
        ...sale,
        blockConfirmed: true,
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
