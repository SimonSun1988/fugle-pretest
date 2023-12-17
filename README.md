# fugle-pretest

## Environment
- macOS Sonoma v14.2
- Node.js v18.0.0
- redids v7.0.5

## Install Packages
`npm install`

## Run Application
`npm run app`

## HTTP API
base url:  http://localhost:3000

### GET /data?user={USER}
#### example
GET `http://localhost:3000/data?user=50`

### response
```
{
  "result": [
    38665900,
    38670850,
    ....,
    ....
  ]
}
```

## Websocket API
base url:  ws://localhost:3000

### /stream
#### subscribe message support
```
subscribe:btcusd
subscribe:ethusd
subscribe:usdtusd
subscribe:solusd
subscribe:adausd
subscribe:avaxusd
subscribe:usdcusd
subscribe:dogeusd
subscribe:dotusd
subscribe:xrpusd
```

#### unsubscribe message support
```
unsubscribe:btcusd
unsubscribe:ethusd
unsubscribe:usdtusd
unsubscribe:solusd
unsubscribe:adausd
unsubscribe:avaxusd
unsubscribe:usdcusd
unsubscribe:dogeusd
unsubscribe:dotusd
unsubscribe:xrpusd
```

### response
```
{
  "data": {
    "id": 311006544,
    "timestamp": "1702838420",
    "amount": 0.02,
    "amount_str": "0.02000000",
    "price": 42060,
    "price_str": "42060",
    "type": 1,
    "microtimestamp": "1702838420685000",
    "buy_order_id": 1695758080245760,
    "sell_order_id": 1695758114930688
  },
  "channel": "live_trades_{symbol}",
  "event": "trade",
  "ohlc": {
    "close": "42060",
    "high": "42060",
    "low": "42060",
    "open": "42060",
    "timestamp": "1702838400",
    "volume": "0.02000000"
  }
}
```