import express from 'express';
import validate from 'express-validation';

import * as nftController from '../controllers/nft/nft.controller';
import * as nctValidator from '../controllers/nft/nft.validator';
import * as saleController from '../controllers/sale/sale.controller';
import * as saleValidator from '../controllers/sale/sale.validator';

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get('/nfts', nftController.allNfts);
router.post('/nfts/new', validate(nctValidator.addNft), nftController.addNft);
router.get('/nfts/:id', nftController.getNft);
router.put(
  '/nfts/:id',
  validate(nctValidator.updateNft),
  nftController.updateNft
);

router.post(
  '/sales/new',
  validate(saleValidator.addSale),
  saleController.addSale
);

module.exports = router;
