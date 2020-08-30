import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from "react-router-dom"
import Checkout from './Checkout.js'

const CheckoutWrapper = props => {
    const isAuthorized = props.state.isAuthorized;
    if(isAuthorized)
        return(
            <Redirect to="/"/>
        );
    else
        return(
            <Route path="/checkout" component={Checkout}/>
        )
};

const mapStateToProps = state => {
    return {
        state: state
    }
};
export default connect(mapStateToProps, null)(CheckoutWrapper)