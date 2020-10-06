import {
    REMOVE_PIZZA_FROM_CART, CHANGE_PIZZA_QUANTITY, ADD_PIZZA_TO_CART, CHANGE_EXCHANGE_RATE, CLEAR_CART,
    CHANGE_INPUT_VALUE, FETCH_EXCHANGE_RATE_COEFFICIENT_AND_DELIVERY, INSERT_ORDER, HAS_AUTHORISED, LOG_OUT, READY_FOR_NEW_ORDER
} from "./types";
import {exchangeRateCoefficient, displayedDeliveryCost, deliveryCost, order, exchangeRate, address, phoneNumber, userId, orderWasSent, isAuthorized, orderSum} from "./data"
import {calculateValueInExchangeRate, calculateSign} from '../assets/scripts/calculateFunctions'

let initialState = {
    orderSum,
    exchangeRate,
    exchangeRateCoefficient,
    sign: calculateSign(exchangeRate),
    order,
    address,
    phoneNumber,
    userId,
    isAuthorized,
    deliveryCost,
    displayedDeliveryCost,
    orderWasSent
};

export const reducer = (state = initialState, action) => {
    switch(action.type) {

        case CHANGE_EXCHANGE_RATE: {
            const newExchangeRate = action.payload;
            const newOrder = {...state.order};
            const newSign = calculateSign(newExchangeRate);
            let newOrderSum = 0;
            newOrder.pizzas.map(pizza => {
                const newDisplayedPrice = calculateValueInExchangeRate(pizza.price, newExchangeRate, state.exchangeRateCoefficient);
                pizza.displayedPrice = newDisplayedPrice;
                newOrderSum += newDisplayedPrice * pizza.counter;
                return pizza;
            });
            const displayedDeliveryCost = calculateValueInExchangeRate(state.deliveryCost, newExchangeRate, state.exchangeRateCoefficient);
            return{...state, order: newOrder, exchangeRate: newExchangeRate, sign: newSign,
                             displayedDeliveryCost: displayedDeliveryCost, orderSum: newOrderSum}
        }

        case FETCH_EXCHANGE_RATE_COEFFICIENT_AND_DELIVERY: {
            const exchangeRateCoefficient = action.payload.coefficient;
            const deliveryCost = action.payload.deliveryCost;
            const displayedDeliveryCost = calculateValueInExchangeRate(deliveryCost, state.exchangeRate, exchangeRateCoefficient);
            return{...state, exchangeRateCoefficient: exchangeRateCoefficient, displayedDeliveryCost: displayedDeliveryCost}
        }

        case ADD_PIZZA_TO_CART: {
            const displayedPrice =  calculateValueInExchangeRate(action.payload.price, state.exchangeRate, state.exchangeRateCoefficient);
            const newPizza = {...action.payload, displayedPrice: displayedPrice};
            let pizzasCopy = [...state.order.pizzas];
            pizzasCopy.push(newPizza);
            const newOrderSum = state.orderSum + displayedPrice;
            let newOrder = {...state.order, pizzas: pizzasCopy};
            return{...state, order: newOrder, orderSum: newOrderSum}
        }

        case CHANGE_PIZZA_QUANTITY: {
            let pizzasCopy = [...state.order.pizzas];
            let newOrderSum = 0;
            pizzasCopy = pizzasCopy.map(pizza =>{
                if(pizza.title === action.payload.title){
                    pizza.counter = action.payload.value;
                    newOrderSum += pizza.displayedPrice * action.payload.value;
                }
                else
                    newOrderSum += pizza.displayedPrice * pizza.counter;
                return pizza
            });
            let changedOrder = {...state.order, pizzas: pizzasCopy};
            return{...state, order: changedOrder, orderSum: newOrderSum}
        }

        case REMOVE_PIZZA_FROM_CART: {
            let pizzasCopy = [...state.order.pizzas];
            let newOrderSum = 0;
            pizzasCopy = pizzasCopy.filter(pizza => {
                if(pizza.title !== action.payload)
                    return 1;
                else
                    newOrderSum += pizza.displayedPrice * pizza.counter;
            });
            let changedOrder = {...state.order, pizzas: pizzasCopy};
            return{...state, order: changedOrder, orderSum: newOrderSum}
        }

        case CLEAR_CART: {
            let newOrder = {...state.order};
            for(let foodType in newOrder){
                newOrder[foodType] = [];
            }
            return{...state, order: newOrder, orderSum: 0}
        }

        case CHANGE_INPUT_VALUE: {
            const name = action.payload.name;
            const value = action.payload.value;
            let newState = {...state};
            Object.keys(newState).forEach(key =>{
                if(key === name)
                    newState[key] = value;
            });
            return{...newState}
        }

        case INSERT_ORDER: {
            let newOrder = {...state.order};
            for(let foodType in newOrder){
                newOrder[foodType] = [];
            }
            return{...state, order: newOrder, orderSum: 0, address: '', phoneNumber: '', orderWasSent: true}
        }

        case HAS_AUTHORISED: {
            const userId = action.payload;
            return{...state, userId: userId, isAuthorized: true}
        }

        case LOG_OUT: {
            return{...state, userId: '', isAuthorized: false}
        }

        case READY_FOR_NEW_ORDER: {
            return{...state, orderWasSent: false}
        }
    }
    return state;
};
