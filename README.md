# Whitelist manager (server)

The purpose of this module is to facilitate the management of the whitelist of a Minecraft server through
a Node.js server and a MongoDB database.

## How to use

When the server is deployed, you can start managing your server whitelist through RESTful API requests.

The module is not able to install the whitelist on the Minecraft server by itself as it only facilitates its management. To synchronize the whitelist it is necessary a plugin on the Minecraft server side (like [Whitelist Synchronizer](https://github.com/crolopez/whitelist-synchronizer/)) that requests and applies it, although it could also be done manually.

## How to deploy

Just execute:

``` bash
yarn install # First time only
yarn start
```

## Configuration

To configure the module you have edit the `.env` file, replacing the default values by the desired ones.

| Option | Description | Default value |
|-|-|-|
| PORT | Server port | 4000 |
| MONGO_DB | MongoDB URI | mongodb://localhost/moderator-panel |
| BACKUP_PERIOD | Whitelist backup period in seconds | 30 |
| BACKUP_FOLDER | Whitelist backup folder | backups |
| LOCALTUNNEL_SUBDOMAIN | The assigned localtunnel subdomain to expose your service if it is not in use. Example, if you set this value to *swm1234*, your service will be exposed to https://swm1234.localtunnel.me. | none |
| ACCEPT_RANDOM_SUBDOMAIN | If the selected subdomain cannot be assigned to you, localtunnel will assign a random subdomain. Choose if accept or not this subdomain. | false |

If you wish, you can expose the service using a method other than localtunnel.me by setting `LOCALTUNNEL_SUBDOMAIN` to *none*.

## RESTful API

### Get the whitelist

You can change the output format of the requests using the following parameters:

| Parameter | Description | Supported values | Default value |
|-|-|-|-|
| format | Print whitelist entries using MongoDB format or Minecraft server. | database/server | database |
| showexpired | Print entries with expired access | yes/no | yes |

Request:

`GET /api/whitelist/`

``` bash
curl -i -H 'Content-Type: application/json' http://localhost:4000/api/whitelist/
```

Response:

``` JSON
[
    {
        "_id":"5feb49d2692ccd5dd7df0fzj",
        "game_tag":"rafa4k",
        "discord_user":"rafa4k#87412",
        "note":"Access by subscription",
        "access_expiry_date":"2021-03-29T14:22:58.677Z",
        "uuid":"a39285c9-3044-3ab9-b22a-399624e81601",
        "created_at":"2020-12-29T15:22:59.054Z",
        "updated_at":"2020-12-29T15:22:59.054Z",
        "__v":0
    },
    {
        "_id":"49su49d2692ccd5dd7df3891",
        "game_tag":"AvocadoMaster",
        "twitch_user":"aldea_jete",
        "note":"Access by subscription",
        "access_expiry_date":"2021-03-30T14:22:58.677Z",
        "uuid":"32158fc9-3044-3ab9-b22a-399624e81179",
        "created_at":"2020-12-29T15:22:59.054Z",
        "updated_at":"2020-12-29T15:23:15.004Z",
        "__v":0
   }
]
```

Request:

`GET /api/whitelist/<ID>`

``` bash
curl -i -H 'Content-Type: application/json' http://localhost:4000/api/whitelist/49su49d2692ccd5dd7df3891
```

Response:

``` JSON
{
    "_id":"49su49d2692ccd5dd7df3891",
    "game_tag":"AvocadoMaster",
    "twitch_user":"aldea_jete",
    "note":"Access by subscription",
    "access_expiry_date":"2021-03-30T14:22:58.677Z",
    "uuid":"32158fc9-3044-3ab9-b22a-399624e81179",
    "created_at":"2020-12-29T15:22:59.054Z",
    "updated_at":"2020-12-29T15:23:15.004Z",
    "__v":0
}
```

### Add an entry

Request:

`POST /api/whitelist/`

``` bash
curl -i -H 'Content-Type: application/json' http://localhost:4000/api/whitelist/ \
-d '{"game_tag":"Bobby", "twitch_user":"Tables", "discord_user":"Tables#4238", "note":"Fortnight", "access_time":"15d"}'
```


Response:

``` JSON
{
    "message":"The whitelist entry was saved."
}
```

### Remove an entry

Request:

`DELETE /api/whitelist/<ID>`

``` bash
curl -X DELETE -i -H 'Content-Type: application/json' http://localhost:4000/api/whitelist/49su49d2692ccd5dd7df3891
```

Response:

``` JSON
{
    "message":"The whitelist entry was removed."
}
```

### Update an entry

Request:

`PUT /api/whitelist/<ID>`

``` bash
curl -X PUT -i -H 'Content-Type: application/json' http://localhost:4000/api/whitelist/5feb49d2609ccd5dd7df0f25 \
-d '{"_id":"5feb49d2609ccd5dd7df0f25", "note": "Access by subscription", "access_time": "1M" }'
```

Response:

``` JSON
{
    "message":"The whitelist entry was updated."
}
```

## Yarn commands

- `yarn install`, install dependencies.
- `yarn dev`, runs server with live reload.
- `yarn start`, runs production mode.
- `yarn build`, transpiles the code.
- `yarn lint`, lints the code.
- `yarn test:unit`, runs unit tests.

## Dotenv

Edit the `.env` file according to your environment.