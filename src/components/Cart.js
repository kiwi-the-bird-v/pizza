import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import PizzaCartItem from './PizzaCartItem.js'
import OrderTotalInfo from './OrderTotalInfo.js'
import {clearCart} from "../redux/actions";
import '../assets/styles/cart.css'

const Cart = props => {
    const pizzas =  props.state.order.pizzas;
    const sign = props.state.sign;
    const displayedDeliveryCost = props.state.displayedDeliveryCost;
    const orderCost = props.state.orderSum;

    const clearCartHandler = () => {
        dispatch(clearCart());
    };

    const dispatch = props.dispatch;

    if(pizzas.length>0)
    return(
        <section id="cart">
            <button id="clear-cart"
                  onClick={clearCartHandler}>Clear cart</button>
            <ul>
                {props.state.order.pizzas.map(pizza => {
                    return <PizzaCartItem key = {pizza.title}
                                          pizza = {pizza}
                    />}
                )}
            </ul>
            <OrderTotalInfo sign={sign}
                        deliveryCost={displayedDeliveryCost}
                        orderCost={orderCost}>
            </OrderTotalInfo>
            <Link to="/contact-details">
                <button className="counter button send">Order</button>
            </Link>
        </section>
    );
    else return(<section id="cart"><h1 className="empty">Your cart is empty. Add some delicious food!</h1></section>)
};

const mapStateToProps = state => {
    return {
        state: state
    }
};
export default connect(mapStateToProps, null)(Cart)