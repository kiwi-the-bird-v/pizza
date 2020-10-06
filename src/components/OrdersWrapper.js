import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from "react-router-dom"
import Orders from './Orders.js'

const OrdersWrapper = props => {
    const isAuthorized = props.state.isAuthorized;

    if(isAuthorized)
    return(
        <Route path="/orders" component={Orders}/>
    );
    else
        return(
            <Redirect to="/checkout"/>
        )
};

const mapStateToProps = state => {
    return {
        state: state
    }
};
export default connect(mapStateToProps, null)(OrdersWrapper)