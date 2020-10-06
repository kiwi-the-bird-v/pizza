import React, {useState, useEffect} from 'react'

import '../assets/styles/orderInfo.scss'

const OrderTotalInfo = ({deliveryCost, orderCost, sign}) => {
    const [sum, setSum] = useState('');

    useEffect(() => {
        setSum(+(Number(orderCost) + Number(deliveryCost)).toFixed(2));
    }, [deliveryCost,orderCost]);

    return(
        <section className="order-info">
           <ul className="order-info__body">
               <li className="order-info__item">Cost of delivery: {deliveryCost} {sign}</li>
               <li className="order-info__item">Total: {sum} {sign}</li>
           </ul>
        </section>
    );
};

export default OrderTotalInfo