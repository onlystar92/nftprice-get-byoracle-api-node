const sameTokenIsSoldWithLast24Hours = async () => {
  // check if same tokneID was sold in the last 24 hours.
  var ONE_HOUR = 60 * 60 * 1000; /* ms */
  const dateOneHourAgo = new Date(transaction.timestamp.getTime() - ONE_HOUR);

  const sameTokenTransactions = await Transaction.find({
    where: {
      chainId,
      nftID: transaction.nftID,
      timestamp: {
        $between: [dateOneHourAgo, transaction.timestamp],
      },
    },
    order: [['timestamp', 'DESC']],
  });

  return sameTokenTransactions.length > 0;
};

const hasMultiNFTxInTx = async (transaction) => {
  // check if only 1 NFT is sold within transaction

  return true;
};

const verifySale = async (transaction) => {
  let verified = true;
  let verificationStatus = '25 block confirmed';

  if (await hasMultiNFTxInTx(transaction)) {
    verificationStatus += ', multi NFTs are sold within tx';
    verified = false;
  }

  if (await sameTokenIsSoldWithLast24Hours(transaction)) {
    verificationStatus += ', same tokenID was sold in the last 24 hours';
    verified = false;
  }

  if (verified) {
    verificationStatus = 'Verified';
  }

  return verificationStatus;
};

module.exports = { verifySale };
