import express from 'express';
import validate from 'express-validation';

import * as nftController from '../controllers/nft/nft.controller';
import * as nftValidator from '../controllers/nft/nft.validator';
import * as saleController from '../controllers/sale/sale.controller';
import * as saleValidator from '../controllers/sale/sale.validator';
import * as transactionController from '../controllers/transaction/transaction.controller';
import * as transactionValidator from '../controllers/transaction/transaction.validator';

const router = express.Router();

//
router.get('/nftprice', validate(nftValidator.getNft), nftController.getNft);

// nfts
router.get('/nfts', nftController.allNfts);
router.post('/nfts', validate(nftValidator.addNft), nftController.addNft);
router.put(
  '/nfts/:id',
  validate(nftValidator.updateNft),
  nftController.updateNft
);
router.delete('/nfts/:id', nftController.removeNft);

// transactions
router.post(
  '/transactions',
  validate(transactionValidator.addTransaction),
  transactionController.addTransaction
);
router.post(
  '/verifytransaction/:chainId',
  validate(transactionValidator.verifyTransaction),
  transactionController.verifyTransaction
);

// router.get('/sales', saleController.allSales);
// router.post(
//   '/sales/new',
//   validate(saleValidator.addSale),
//   saleController.addSale
// );
module.exports = router;
