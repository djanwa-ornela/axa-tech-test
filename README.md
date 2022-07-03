## Requirements

* Node 14.19.0
* Git

## Getting started
You should clone the repo and install the dependencies.

```bash
git clone https://github.com/djanwa-ornela/axa-tech-test.git
cd axa-test-tech
```
## Dependencies
To install the dependencies, run the following

```bash
npm install
```
To install the dependencies for the frontend , run the following
```bash
cd front
npm install
```

## Starting locally app

To start backend and front server with concurrently (server is running on port 4000)

```bash
npm run dev 
```

Start only frontend (React App is running on port 4001)
```bash
npm run start-front
```
Open http://localhost:4001 to access app.

Start only backend server

```bash
npm run start-backend 
```
Open http://localhost:4000/stock to list available stock.

## Json server api

Start json-server api 

```bash
npm run start-api
```

Start Api which response with delay (10s)

```bash
npm run delay-api
```
## Run unit tests

Test backend 
```bash
npm run test-back
```

Test frontend  
```bash
npm run test-front
```

## Backend Api Documentation

Backend api documentation is available at : 
```console
http://localhost:4000/api/documentation
```

## Api Routes

To load the last 20 stock value samples :

```console
$> curl http://localhost:3000/stocks?_limit=20
```

To load all available stock value samples :

```console
$> curl http://localhost:3000/stocks
```
Queries return a JSON array of stock samples :

```javascript
[
  {
    timestamp: "2018-11-08T14:47:41.157Z",
    index: 0,
    stocks: "17.482"
  },
  {
    timestamp: "2018-11-07T14:47:41.158Z",
    index: 1,
    stocks: "18.335"
  }
];
```
