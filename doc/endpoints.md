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
    "chainId": "4",
    "name": "BoredApeYachtClub",
    "address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
}'
```

### PUT /api/v1/nfts/:id

```
curl -X PUT -H 'Content-Type: application/json' http://localhost:8082/api/v1/nfts/1?api_key=Dcopvom3X039 -d '{
"chainId": "4",
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
curl -X GET -H 'Content-Type: application/json' 'http://localhost:8082/api/v1/price?api_key=Dcopvom3X039&chainId=4&address=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'
```

### POST /api/v1/orders

```
curl -X POST -H 'Content-Type: application/json' 'http://localhost:8082/api/v1/orders?api_key=Dcopvom3X039' -d '{
    "transactionHash": "0xc6cfbc270da5784ccaa2eab3748c6714d66073c40ff54731d188cd3014a7c2d3",
    "contract": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    "etherValue": "100",
    "chainId": "4",
    "maker": "0xed36b17651229475a8eefbb64b706c18aafd4311",
    "taker": "0x558dc4f8e08dd24f728644a0dd60e5693233c889"
}'
```

### POST /api/v1/transfer

```
curl -X POST -H 'Content-Type: application/json' 'http://localhost:8082/api/v1/transfers?api_key=Dcopvom3X039' -d '{
    "transactionHash": "0xc6cfbc270da5784ccaa2eab3748c6714d66073c40ff54731d188cd3014a7c2d3",
    "contract": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    "tokenId": "5448",
    "chainId": "4",
    "from": "0xed36b17651229475a8eefbb64b706c18aafd4311",
    "to": "0x558dc4f8e08dd24f728644a0dd60e5693233c889"
}'
```

### POST /api/v1/verify

```
curl -X POST -H 'Content-Type: application/json' 'http://localhost:8082/api/v1/verifytransaction?api_key=Dcopvom3X039&nftId=1&tokenId=5448' -d '{
    "transaction_hash": "0xc6cfbc270da5784ccaa2eab3748c6714d66073c40ff54731d188cd3014a7c2d3",
    "block_timestamp":  1644505503,
    "confirmations": 25
}'
```

### POST calcFloorPrice

```
curl -X POST -H 'Content-Type: application/json' http://localhost:8082/api/v1/process/calcFloorPrice?api_key=Dcopvom3X039
```

### POST seed

```
curl -X POST -H 'Content-Type: application/json' http://localhost:8082/api/v1/process/seed?api_key=Dcopvom3X039
```
