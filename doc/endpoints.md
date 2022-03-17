# Drops NFT Price

- Please use x-www-form-urlencoded format for body params.
- The price will be provided in USD value.

## API Format

### Success Response

```
{
    "success": true,
    "code": 200,
    "data": { ... }
}
```

### Error Response

```
{
    "success": false,
    "code": 500,
    "errorMessage": "The provided auth token is not valid",
    "error": "Authentication Required",
    "data": null
}
```

## Endpoints

### GET /api/v1/nfts

```
curl -X GET -H 'Content-Type: application/json' http://localhost:8082/api/v1/nfts?api_key=Dcopvom3X039
```

### GET /api/v1/nfts/1

```
curl -X GET -H 'Content-Type: application/json' http://localhost:8082/api/v1/nfts/1?api_key=Dcopvom3X039
```

### POST /api/v1/nfts

```
curl -X POST -H 'Content-Type: application/json' http://localhost:8082/api/v1/nfts?api_key=Dcopvom3X039 -d '{
    "chainId": "1",
    "name": "BoredApeYachtClub",
    "address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
}'
```

### PUT /api/v1/nfts/:id

```
curl -X PUT -H 'Content-Type: application/json' http://localhost:8082/api/v1/nfts/1?api_key=Dcopvom3X039 -d '{
"chainId": "1",
"name": "BoredApeYachtClub",
"address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
}'
```

### DELETE /api/v1/nfts/:id

```
curl -X DELETE -H 'Content-Type: application/json' http://localhost:8082/api/v1/nfts/1?api_key=Dcopvom3X039
```

### GET /api/v1/price

```
curl -X GET -H 'Content-Type: application/json' 'http://localhost:8082/api/v1/price?chainId=1&address=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&api_key=Dcopvom3X039'
```

### POST /api/v1/sales

```
curl -X POST -H 'Content-Type: application/json' 'http://localhost:8082/api/v1/sales?api_key=Dcopvom3X039' -d '{
    "transactionHash": "0xf98c0ec55cb018c3d98d1c6ccb146ed06caeabafb26f625c726c7a1c34e95659",
    "contract": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    "tokenId": "9546",
    "chainId": "1",
    "from": "0x7155cdd3efe712cd9805e5f58ff4f40868fed12e",
    "to": "0xf8c0c9c73a07fe850cca85f22ff31aa60a81780a",
    "etherValue": "109999900000000000000",
    "datetime": "2022-03-17T01:40:44"
}'
```

### POST /api/v1/verify

```
curl -X POST -H 'Content-Type: application/json' 'http://localhost:8082/api/v1/verifytransaction?api_key=Dcopvom3X039&saleId=1' -d '{
    "transaction_hash": "0x0ceeb65f82148d425b52065087333a595fe4f209658294c6b12de4a83717d747",
    "block_timestamp":  1644505503,
    "confirmations": 25
}'
```

### POST calcFloorPrice

```
curl -X POST -H 'Content-Type: application/json' http://localhost:8082/api/v1/process/calcFloorPrice?api_key=Dcopvom3X039
```

### POST calculateDropsTWAPValue

```
curl -X POST -H 'Content-Type: application/json' http://localhost:8082/api/v1/process/calcTWAPPrice?api_key=Dcopvom3X039
```

### POST seed

```
curl -X POST -H 'Content-Type: application/json' http://localhost:8082/api/v1/process/seed?api_key=Dcopvom3X039
```

### Parsiq Tx Lifecycle API

```
curl --location --request POST 'https://api.parsiq.net/v1/transaction-lifecycle' \
--header 'Authorization: Bearer c9f2b8f57069cef1db803600e8a7d8ad6cb3b3f1b71860aeb60b70a48ec32934' \
--header 'Content-Type: application/json' \
--data-raw '{
    "tx_hash": "0x0ceeb65f82148d425b52065087333a595fe4f209658294c6b12de4a83717d747",
    "callback_url": "https://8f8f-217-150-72-243.ngrok.io/api/v1/verifytransaction?api_key=Dcopvom3X039&nftId=1&tokenId=9546",
    "confirmations": 12,
    "chain_id": "eip155:1"
}'
```
