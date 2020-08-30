import React from 'react';
import '../assets/styles/cartIcon.css'

const CartIcon = props => {
    return(
            <div id="enscart_my_wrapper">
                <div id="enscart_myimage_wrapper">
                    <img src="https://i.ibb.co/ZfJ03Ns/shop1.png"/>
                </div>
                <div id="enscart_my_counter_wrapper"><span id="easynetshop-cart-count">{props.counter}</span></div>
            </div>
    );
};

export default CartIcon