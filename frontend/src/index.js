import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import './index.css';
// import App from './App';
import App from '../src/components/App';
import rootReducer from './reducers';
import {createStore, applyMiddleware} from 'redux';
// import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
// const store=createStore(rootReducer);
const store = createStore(rootReducer,applyMiddleware(ReduxThunk))
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
