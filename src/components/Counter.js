import React from 'react';

import '../assets/styles/counter.scss'

const Counter = ({counter,index,changePizzaCounter}) => {

    if(counter>0)
    return(
        <div className="counter">
            <ul className="counter__body">
                <li className="counter__button button"
                    onClick={() => changePizzaCounter(counter - 1)}>&#8722;</li>
                <li><span className="counter__quantity">{counter}</span></li>
                <li className="counter__button button"
                    onClick={() => changePizzaCounter(counter + 1)}>&#43;</li>
            </ul>
        </div>
    );
    else return(<button className='button send'
                        onClick={() => changePizzaCounter(counter + 1)}>Add to cart &#43;</button>)
};

export default Counter