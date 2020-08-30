import React from 'react';

const OrderFoodItem = props => {
    const {title, image, displayedPrice, counter} = props.foodItem;
    const sign = props.sign;

    return(
        <li className="pizza-cart-item">
            <div className="pizza-cart-item-content">
                <div>
                    <img src={`https://drive.google.com/uc?export=view&id=${image}`}/>
                    <h3>{title}</h3>
                </div>
                <div>
                    <p>{counter} x {displayedPrice} {sign}</p>
                </div>
            </div>
        </li>
    );
};

export default OrderFoodItem