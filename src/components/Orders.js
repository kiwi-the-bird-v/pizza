import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import OrderItem from './OrderItem.js'
import '../assets/styles/orders.scss'
import axios from "axios"

const Orders = props => {
    const userId = props.state.userId;

    useEffect(() => {
        fetchOrders();
    }, []);

    const [ordersList, setOrdersList] = useState(false);

    const fetchOrders = () => {
        axios
            .post('https://liptonv.pythonanywhere.com/get_orders_by_user_id', {userId})
            .then(res => res.data)
            .then(data => {
                if(data) {
                    let ordersArray = [...data.data];
                    for (let field of ordersArray) {
                        let pizzasArray = JSON.parse(field.orders).pizzas;
                        let newPizzasArr = [];
                        for (let pizza of pizzasArray) {
                            newPizzasArr.push(pizza);
                        }
                        field.orders = newPizzasArr;
                    }
                    setOrdersList(ordersArray);
                }
            });
    };

    if(ordersList.length)
    return(
        <section className="orders">
            <ul className="orders__list">
                {ordersList.map((order,index) => {
                  return <OrderItem key={index} order={order}/>}
                )}
            </ul>
        </section>
    );
    else return(<section className="empty-block"><h1 className="empty-block__message">You don't have any orders yet</h1></section>)

};

const mapStateToProps = state => {
    return {
        state: state
    }
};
export default connect(mapStateToProps, null)(Orders)