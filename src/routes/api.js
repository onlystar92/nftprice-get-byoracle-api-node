import express from 'express';
import validate from 'express-validation';

import * as nftController from '../controllers/nft/nft.controller';
import * as nctValidator from '../controllers/nft/nft.validator';

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get('/nft/all', nftController.allNfts);
router.post('/nft/new', validate(nctValidator.addNft), nftController.addNft);

module.exports = router;
