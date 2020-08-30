import React, {useState, useEffect} from 'react'
import '../assets/styles/orderTotalInfo.css'

const OrderTotalInfo = ({deliveryCost, orderCost, sign}) => {
    const [sum, setSum] = useState('');

    useEffect(() => {
        setSum(+(Number(orderCost) + Number(deliveryCost)).toFixed(2));
    }, [deliveryCost,orderCost]);

    return(
        <section id='order-info'>
           <ul>
               <li>Cost of delivery: {deliveryCost} {sign}</li>
               <li>Total: {sum} {sign}</li>
           </ul>
        </section>
    );
};

export default OrderTotalInfo