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

${API_KEY}

### add new NFT

```
curl -X POST -H 'Content-Type: application/json' http://localhost:8082/api/v1/nfts/new?api_key=Dcopvom3X039&chainId=4&address=0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b&name=CryptoPunks
curl -X POST -H 'Content-Type: application/json' -d '{
    "chainId": "4",
    "address": "0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b",
    "name": "CryptoPunks"
}' http://localhost:8082/api/v1/nfts?api_key=Dcopvom3X039
```

### list all NFTs

```
curl -X GET -H 'Content-Type: application/json' http://localhost:8082/api/v1/nfts?api_key=Dcopvom3X039
```

### get NFT

```
curl -X GET -H 'Content-Type: application/json' http://localhost:8082/api/v1/nftprice?api_key=Dcopvom3X039&chainId=4&address=0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b

```

### add new Sale

```
curl -X POST -H 'Content-Type: application/json' -d '{
    "tokenId": "6227",
    "timestamp": "1644505503",
    "etherValue": "90",
    "transactionHash": "0x25d263b4f386abd30e0dcf582e1b6de4db4590f260be7d610ae116c6fc4d70bf",
    "chainId": "4",
    "address": "0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b",
    from: "parsiq"
}' http://localhost:8082/api/v1/transactions/new?api_key=Dcopvom3X039
```
