window.jQuery = require('jquery');
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');
require('../css/style.css');
import './index.html';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import allReducers from './reducers';
import App from './components/App';
//import createLogger from 'redux-logger';

//const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
