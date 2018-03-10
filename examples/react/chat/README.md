# Redux-zero simple webchat

A simple chat built with [create-react-app](https://github.com/facebook/create-react-app) using [redux-zero](https://github.com/concretesolutions/redux-zero), recompose, react-router and jest. For run the api, using json-server.

To run this example in
#### Development mode
```shell
npm run mock:api
export REACT_APP_API_BASE_URL=http://localhost:3000 #localhost:3000 = json-server api URL
npm start
```

#### Production mode
```shell
npm run mock:api
export REACT_APP_API_BASE_URL=http://localhost:3000 #localhost:3000 = json-server api URL
npm run build
```

#### Test mode
```
npm run test
```
