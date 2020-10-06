import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import '../assets/styles/pizzaMenuItem.scss'
import Counter from './Counter.js'
import {addPizzaToCart, changePizzaQuantity, removePizzaFromCart} from "../redux/actions";
import {calculateValueInExchangeRate} from '../assets/scripts/calculateFunctions'

const PizzaMenuItem = props =>{
    const {title, image, price, ingredients} = props.pizza;
    const sign = props.state.sign;
    const exchangeRate = props.state.exchangeRate;
    const coefficient = props.state.exchangeRateCoefficient;


    const initialCounter = () => {
        let checkedPizza = props.state.order.pizzas.find(pizza =>{
            return pizza.title === title
        });
        return checkedPizza ? checkedPizza.counter : 0
    };

    const [counter, setCounter] = useState();
    const [resultPrice, setResultPrice] = useState();

    useEffect(() => {
       setResultPrice(calculateValueInExchangeRate(price,exchangeRate,coefficient));
    }, [exchangeRate, coefficient]);

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
                dispatch(addPizzaToCart({title, price, image, counter: value}));

    };

    const dispatch = props.dispatch;
    return(
       <li className="pizza-item">
           <div className="pizza-item__body">
               <img src={`https://drive.google.com/uc?export=view&id=${image}`} className="pizza-item__image"/>
               <h3 className="pizza-item__title">{title}</h3>
               <aside className="pizza-item__ingredients">{ingredients.toString()}</aside>
               <aside className="pizza-item__price">{resultPrice} {sign}</aside>
               <div className="pizza-item__button">
                   <Counter counter={counter}
                            changePizzaCounter={changePizzaCounter}/>
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