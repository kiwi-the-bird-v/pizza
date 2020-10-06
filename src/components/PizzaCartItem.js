import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import '../assets/styles/pizzaCartItem.scss'
import Counter from './Counter.js'
import {addPizzaToCart, changePizzaQuantity, removePizzaFromCart} from "../redux/actions";


const PizzaMenuItem = props => {
    const {title, image, price, displayedPrice} = props.pizza;
    const sign = props.state.sign;

    const [counter, setCounter] = useState(0);

    const initialCounter = () => {
        let checkedPizza = props.state.order.pizzas.find(pizza =>{
            return pizza.title === title
        });
        return checkedPizza ? checkedPizza.counter : 0
    };

    useEffect(() => {
        setCounter(initialCounter());
    }, []);


    const changePizzaCounter = (value) => {
        setCounter(value);
        if(counter > 0 && value > 0)
            dispatch(changePizzaQuantity({title,value}));
        else
        if (value < 1)
            dispatch(removePizzaFromCart(title));
        else
            dispatch(addPizzaToCart({title,price,image,counter:value}));
    };

    const dispatch = props.dispatch;
    return(
       <li className="pizza-cart-item">
           <div className="pizza-cart-item-content">
               <div>
                   <img src={`https://drive.google.com/uc?export=view&id=${image}`}/>
                   <h3>{title}</h3>
               </div>
               <div>
                   <p>{(displayedPrice*counter).toFixed(2)} {sign}</p>
                   <Counter counter={counter}
                            changePizzaCounter={changePizzaCounter}
                   />
               </div>
           </div>
       </li>
    );
};

const mapStateToProps = state => {
    return {
        state: state
    }
};
export default connect(mapStateToProps, null)(PizzaMenuItem)