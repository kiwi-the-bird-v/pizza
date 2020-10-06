import React, {useEffect, useState} from 'react';
import OrderFoodItem from './OrderFoodItem.js'
import {calculateSign} from '../assets/scripts/calculateFunctions'

const OrderItem = props => {
    const {address,phoneNumber,totalPrice,exchangeRate,date} = props.order;

    useEffect(() => {
        setSign(calculateSign(exchangeRate));
    }, [exchangeRate]);

    const [sign, setSign] = useState('');

    return(
       <li className="order">
           <div>
               <ul className="order__body">
                   <li>Phone number: {phoneNumber}</li>
                   <li>Address: {address}</li>
                   <li>Date: {date}</li>
               </ul>
               <ul>
                   {props.order.orders.map(item => {
                       return <OrderFoodItem key = {item.title}
                                             foodItem={item}
                                             sign={sign}>
                       </OrderFoodItem>}
                   )}
               </ul>
               <div className="order__cost">Total cost includes delivery: {totalPrice} {sign}</div>
           </div>
       </li>
    );
};

export default OrderItem