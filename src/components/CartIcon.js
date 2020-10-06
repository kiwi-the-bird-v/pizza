import React from 'react';

import '../assets/styles/cartIcon.scss'

const CartIcon = props => {
    return(
            <div className="cart-icon">
                <div className="cart-icon__image-block">
                    <img className="cart-icon__image" src="https://i.ibb.co/ZfJ03Ns/shop1.png"/>
                </div>
                <div className="cart-icon__counter-block">
                    <span className="cart-icon__counter">{props.counter}</span>
                </div>
            </div>
    );
};

export default CartIcon