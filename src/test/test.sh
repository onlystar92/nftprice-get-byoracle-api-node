- list all NFTs
curl -X GET -H 'Authorization: drops-api-secret-key' -H 'Content-Type: application/json' http://localhost:8082/api/v1/nfts

- add new NFT
curl -X POST -H 'Authorization: drops-api-secret-key' -H 'Content-Type: application/json' -d '{"name":"CryptoPunk #6227", "address":"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb","chainId":"0"}' http://localhost:8082/api/v1/nfts/new

- list all sales
curl -X GET -H 'Authorization: drops-api-secret-key' -H 'Content-Type: application/json' http://localhost:8082/api/v1/sales

- add new Sale
curl -X POST -H 'Authorization: drops-api-secret-key' -H 'Content-Type: application/json' -d '{
    "address": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bcc",
    "chainId": "0",
    "tokenId": "6227",
    "timestamp": "1644505503",
    "etherValue": "90",
    "transactionHash": "0x25d263b4f386abd30e0dcf582e1b6de4db4590f260be7d610ae116c6fc4d70bf"
}' http://localhost:8082/api/v1/sales/new