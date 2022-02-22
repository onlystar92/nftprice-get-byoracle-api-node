#!/bin/bash
cd /home/ubuntu/nft-price-oracle-api
node_modules/.bin/sequelize db:migrate
pm2 restart server