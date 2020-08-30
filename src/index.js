import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from "react-router-dom"
import '@babel/polyfill'
import {createStore, applyMiddleware} from "redux"
import thunk from 'redux-thunk';

import { persistStore, persistReducer} from 'redux-persist'
import { PersistGate} from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

import {reducer} from "./redux/reducer"
import {composeWithDevTools } from 'redux-devtools-extension'
import App from './App.js'

import './assets/styles/app.css'

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);


ReactDom.render(
    <Router>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </Router>,
    document.getElementById('app')
);




