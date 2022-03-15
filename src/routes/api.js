import express from 'express';
import validate from 'express-validation';

import * as nftController from '../controllers/nft/nft.controller';
import * as nftValidator from '../controllers/nft/nft.validator';
import * as saleController from '../controllers/sale/sale.controller';
import * as saleValidator from '../controllers/sale/sale.validator';
import * as process from '../controllers/process/process.controller';

const router = express.Router();

// for chainlink
router.get('/price', validate(nftValidator.getPrice), nftController.getPrice);

// for parsiq
router.post(
  '/orders',
  validate(saleValidator.addOrder),
  saleController.addOrder
);
router.post(
  '/transfers',
  validate(saleValidator.addTransfer),
  saleController.addTransfer
);
router.post(
  '/verifytransaction',
  validate(saleValidator.verifyTransaction),
  saleController.verifyTransaction
);

// for admin
router.get('/nfts', nftController.allNfts);
router.get('/nfts/:id', validate(nftValidator.getNft), nftController.getNft);
router.post('/nfts', validate(nftValidator.addNft), nftController.addNft);
router.put(
  '/nfts/:id',
  validate(nftValidator.updateNft),
  nftController.updateNft
);
router.delete(
  '/nfts/:id',
  validate(nftValidator.removeNft),
  nftController.removeNft
);

router.get('/sales', saleController.allSales);
router.post(
  '/sales/new',
  validate(saleValidator.addSale),
  saleController.addSale
);

// for test
router.post('/process/calcFloorPrice', process.calcFloorPrice);
router.post('/process/calcTWAPPrice', process.calcTWAPPrice);
router.post('/process/seed', process.seedSales);

module.exports = router;
