import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import './index.css';
// import App from './App';
import App from '../src/components/App';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
// import store from './app/store';
import storage from "redux-persist/lib/storage"
// import React from 'react'
import { persistStore, persistReducer } from "redux-persist"
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import logger from 'redux-logger'
// const store=createStore(rootReducer);
const persistConfig = {
  key: "auth_reducer",
  storage: storage,
  whitelist: ["auth_reducer"]
}
const pReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(pReducer, applyMiddleware(ReduxThunk, logger))
const persist = persistStore(store)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
export { store, persist }
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
