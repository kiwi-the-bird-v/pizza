import React, {useEffect} from 'react'
import {Switch, Route, Redirect} from "react-router-dom"
import {useDispatch} from 'react-redux';

import Header from './components/Header.js'
import Menu from './components/Menu.js'
import OrdersWrapper from './components/OrdersWrapper.js'
import Cart from './components/Cart.js'
import ContactDetailsForm from './components/ContactDetailsForm.js'
import CheckoutWrapper from './components/CheckoutWrapper.js'
import PageNotFound from './components/PageNotFound.js'
import {fetchExchangeRateCoefficientAndDelivery} from "./redux/actions"
import './assets/styles/app.scss'


export default function () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchExchangeRateCoefficientAndDelivery());
    }, []);

    return(
        <main>
            <Header/>
            <Switch>
                <Route path="/" exact render={() => (<Redirect to="/menu" />)}/>
                <Route path="/menu" component={Menu}/>
                <Route path="/orders" component={OrdersWrapper}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/contact-details" exact component={ContactDetailsForm}/>
                <Route path="/checkout" component={CheckoutWrapper}/>
                <Route component={PageNotFound} />
            </Switch>
        </main>
    );
}


