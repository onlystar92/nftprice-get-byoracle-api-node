# DropsOrg NFT Price API

### Project Setup

Once you clone or download project go into you folder

> now cope **.env.local** file to **.env** file

### Installing

```
> npm install or yarn install  (this will install all dependent libraries)
```

## Sequelize CLI realted to migrations and seed

```
>   node_modules/.bin/sequelize db:migrate                        Run pending migrations
>   node_modules/.bin/sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
>   node_modules/.bin/sequelize db:migrate:status                 List the status of all migrations
>   node_modules/.bin/sequelize db:migrate:undo                   Reverts a migration
>   node_modules/.bin/sequelize db:migrate:undo:all               Revert all migrations ran
>   node_modules/.bin/sequelize db:seed                           Run specified seeder
>   node_modules/.bin/sequelize db:seed:undo                      Deletes data from the database
>   node_modules/.bin/sequelize db:seed:all                       Run every seeder
>   node_modules/.bin/sequelize db:seed:undo:all                  Deletes data from the database
>   node_modules/.bin/sequelize db:create                         Create database specified by configuration
>   node_modules/.bin/sequelize db:drop                           Drop database specified by configuration
>   node_modules/.bin/sequelize init                              Initializes project
>   node_modules/.bin/sequelize init:config                       Initializes configuration
>   node_modules/.bin/sequelize init:migrations                   Initializes migrations
>   node_modules/.bin/sequelize init:models                       Initializes models
>   node_modules/.bin/sequelize init:seeders                      Initializes seeders
>   node_modules/.bin/sequelize migration:generate                Generates a new migration file      [aliases: migration:create]
>   node_modules/.bin/sequelize model:generate                    Generates a model and its migration [aliases: model:create]
>   node_modules/.bin/sequelize seed:generate                     Generates a new seed file
```

### Success Response

```
{
    "success": true,
    "code": 200,
    "data": "object or array"
}
```

### Error Response

```
{
    "success": false,
    "code": 500,
    "errorMessage": "************************",
    "error": {},
    "data": null
}
```
