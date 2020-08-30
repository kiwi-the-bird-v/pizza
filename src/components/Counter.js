import React from 'react';
import '../assets/styles/counter.css'


const Counter = ({counter,index,changePizzaCounter}) => {

    if(counter>0)
    return(
        <div>
            <ul className="counter">
                <li className="button counter-button"
                    onClick={() => changePizzaCounter(counter - 1)}>&#8722;</li>
                <li><span className="quantity">{counter}</span></li>
                <li className="button counter-button"
                    onClick={() => changePizzaCounter(counter + 1)}>&#43;</li>
            </ul>
        </div>
    );
    else return(<button className='counter button send'
                        onClick={() => changePizzaCounter(counter + 1)}>Add to cart &#43;</button>)
};

export default Counter