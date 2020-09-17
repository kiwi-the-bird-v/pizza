import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import OrderItem from './OrderItem.js'

const Orders = props => {
    const userId = props.state.userId;

    useEffect(() => {
        fetchOrders();
    }, []);

    const [ordersList, setOrdersList] = useState(false);

    const fetchOrders = () => {
        fetch('https://liptonv.pythonanywhere.com/get_orders_by_user_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({userId})})
            .then(res => res.json())
            .then(data => {
                let ordersArray = [...data.data];
                for(let field of ordersArray){
                    let pizzasArray = JSON.parse(field.orders).pizzas;
                    let newPizzasArr = [];
                    for(let pizza of pizzasArray){
                        newPizzasArr.push(pizza);
                    }
                    field.orders = newPizzasArr;
                }
                setOrdersList(ordersArray);
            })
    };

    if(ordersList.length)
    return(
        <section id='orders'>
            <ul>
                {ordersList.map((order,index) => {
                  return <OrderItem key={index} order={order}/>}
                )}
            </ul>
        </section>
    );
    else return(<section id='orders'><h1 className="empty">You don't have any orders yet</h1></section>)

};

const mapStateToProps = state => {
    return {
        state: state
    }
};
export default connect(mapStateToProps, null)(Orders)
