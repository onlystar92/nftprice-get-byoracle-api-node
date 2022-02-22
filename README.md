# DropsOrg NFT Price API

## Project Setup

Once you clone or download project go into you folder

> now cope **.env.local** file to **.env** file

### Install all dependent libraries

```
npm install
```

### Run pending migrations

```
node_modules/.bin/sequelize db:migrate
```

## API

### API endpoints

- Please use x-www-form-urlencoded format for body params.
- The price will be provided in USD value.

#### list all NFTs

```
curl -X GET -H 'Authorization: SECRETE_API_KEY' -H 'Content-Type: application/json' http://localhost:8082/api/v1/nfts
```

#### get price info of NFT

- You should set chainId in request body.

```
curl -X GET -H 'Authorization: SECRETE_API_KEY' -H 'Content-Type: application/json' -d '{"chainId":"1"}' http://localhost:8082/api/v1/nfts/${address}
```

#### add new Sale

```
curl -X POST -H 'Authorization: drops-api-secret-key' -H 'Content-Type: application/json' -d '{
    "address": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bcc",
    "chainId": "0",
    "tokenId": "6227",
    "timestamp": "1644505503",
    "etherValue": "90",
    "transactionHash": "0x25d263b4f386abd30e0dcf582e1b6de4db4590f260be7d610ae116c6fc4d70bf"
}' http://localhost:8082/api/v1/sales/new
```

### API Format

#### Success Response (/api/v1/nfts/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb)

```
{
    "success": true,
    "code": 200,
    "data": {
        "name":"CRYPTOPUNKS",
        "address":"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
        "chainId":"1",
        "roundId":0,
        "usdPrice":{
            "drops":0
        }
    }
}
```

#### Error Response

```
{
    "success": false,
    "code": 500,
    "errorMessage": "The provided auth token is not valid",
    "error": "Authentication Required",
    "data": null
}
```
