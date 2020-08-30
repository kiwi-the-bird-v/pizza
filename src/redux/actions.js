import {
    REMOVE_PIZZA_FROM_CART, CHANGE_PIZZA_QUANTITY, ADD_PIZZA_TO_CART, CHANGE_EXCHANGE_RATE,
    FETCH_EXCHANGE_RATE_COEFFICIENT_AND_DELIVERY, CLEAR_CART, CHANGE_INPUT_VALUE, INSERT_ORDER, HAS_AUTHORISED, LOG_OUT,
    READY_FOR_NEW_ORDER
} from "./types";


export const fetchExchangeRateCoefficientAndDelivery = () => async dispatch => {
    const res =  await fetch("http://liptonv.pythonanywhere.com/dollar_to_euro");
    const result = await res.json();
    dispatch({
        type: FETCH_EXCHANGE_RATE_COEFFICIENT_AND_DELIVERY,
        payload: result
    });
};
export const changeExchangeRate = exchangeRate => {
    return {
        type: CHANGE_EXCHANGE_RATE,
        payload: exchangeRate
    }
};
export const addPizzaToCart = pizza => {
    return {
        type:  ADD_PIZZA_TO_CART,
        payload: pizza
    }
};
export const changePizzaQuantity = changedPizza => {
    return {
        type:  CHANGE_PIZZA_QUANTITY,
        payload: changedPizza
    }
};
export const removePizzaFromCart = pizzasTitle => {
    return {
        type:  REMOVE_PIZZA_FROM_CART,
        payload: pizzasTitle
    }
};
export const clearCart = () => {
    return {
        type:  CLEAR_CART
    }
};
export const changeInputValue = data => {
    return {
        type:  CHANGE_INPUT_VALUE,
        payload: data
    }
};
export const insertOrder = order => async dispatch => {
    try {
        const res =  await fetch("http://liptonv.pythonanywhere.com/insert_order", {
              method: 'POST',
                  headers: {
                  'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(order)
        });
        const result = await res.json();
        dispatch({
            type: INSERT_ORDER,
            payload: result
        });
    } catch {}

};
export const hasAuthorized = data => {
    return {
        type: HAS_AUTHORISED,
        payload: data
    }
};
export const logOut = () => {
    return {
        type: LOG_OUT
    }
};
export const readyForNewOrder = () => {
    return {
        type: READY_FOR_NEW_ORDER
    }
};