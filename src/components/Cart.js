import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {Link, useHistory } from 'react-router-dom'

import PizzaCartItem from './PizzaCartItem.js'
import OrderTotalInfo from './OrderTotalInfo.js'
import {clearCart} from "../redux/actions";
import '../assets/styles/cart.scss'

const Cart = props => {
    const pizzas =  props.state.order.pizzas;
    const sign = props.state.sign;
    const displayedDeliveryCost = props.state.displayedDeliveryCost;
    const orderCost = props.state.orderSum;
    const orderButton = useRef(null);
    let history = useHistory();

    useEffect(() => {
        if(pizzas.length > 0){
            const onKeyDown = e => {
                if(e.keyCode === 13) {
                    console.log('нажат энтер');
                    history.push('/contact-details');
                }
            };
            document.addEventListener('keydown', onKeyDown);
            orderButton.current.focus();
            return () => {
                document.removeEventListener('keydown', onKeyDown);
            };
        }
    }, [pizzas.length]);


    const clearCartHandler = () => {
        dispatch(clearCart());
    };

    const dispatch = props.dispatch;

    if(pizzas.length>0)
    return(
        <section className="cart">
            <button className="cart__clear-button"
                  onClick={clearCartHandler}>Clear cart</button>
            <ul className="cart__products">
                {props.state.order.pizzas.map(pizza => {
                    return <PizzaCartItem key = {pizza.title}
                                          pizza = {pizza}
                    />}
                )}
            </ul>
            <div className="cart__order-info">
                <OrderTotalInfo
                    sign={sign}
                    deliveryCost={displayedDeliveryCost}
                    orderCost={orderCost}>
                </OrderTotalInfo>
            </div>
            <Link to="/contact-details">
                <button className="cart__order button send" ref={orderButton}>Order</button>
            </Link>
        </section>
    );
    else return(<section className="empty-block"><h1 className="empty-block__message">Your cart is empty. Add some delicious food!</h1></section>)
};

const mapStateToProps = state => {
    return {
        state: state
    }
};
export default connect(mapStateToProps, null)(Cart)