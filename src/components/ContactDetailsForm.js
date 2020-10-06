import React, {useEffect, useState,Fragment} from 'react';
import {connect} from "react-redux";

import {changeInputValue,insertOrder,readyForNewOrder} from "../redux/actions";
import OrderTotalInfo from './OrderTotalInfo.js'
import FormInput from './FormInput.js';
import PopUp from './PopUp.js'

const ContactDetailsForm = props => {
    const phoneNumber = props.state.phoneNumber;
    const address = props.state.address;
    const sign = props.state.sign;
    const displayedDeliveryCost = props.state.displayedDeliveryCost;
    const orderCost = props.state.orderSum;
    const userId = props.state.userId;
    const exchangeRate = props.state.exchangeRate;
    const order = props.state.order;
    const orderWasSent = props.state.orderWasSent;

    const [contactDetails, setContactDetails] = useState([
        {
            name: 'phoneNumber',
            value: phoneNumber,
            title: 'Phone Number',
        },
        {
            name: 'address',
            value: address,
            title: 'Address'
        }
    ]);

    const [activeElement, setActiveElement] = useState('contact-details-form');
    const [message, setMessage] = useState('');
    const [imageLink, setImageLink] = useState('');

    useEffect(() => {
        setContactDetails([
            {
                name: 'phoneNumber',
                value: phoneNumber,
                title: 'Phone Number',
            },
            {
                name: 'address',
                value: address,
                title: 'Address'
            }
        ]);
    }, [address,phoneNumber]);

    useEffect(() => {
        if(orderWasSent){
            setActiveElement('pop-up');
            setMessage('Your order is accepted!');
            setImageLink('1KUFWJOSaU8K1YvnvkKTD2lrYDv3b5LPq');
        }
    }, [orderWasSent]);


    useEffect(() => {
        const onKeyDown = e => {
            if(e.keyCode === 13) {
                orderButtonOnClick();
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, []);


    const changeInputValueHandler = e => {
        const {name, value} = e.target;
        let newContactDetails = [...contactDetails];
        newContactDetails.map(input => {
           if(input.name === name)
               input.value = value;
            return input
        });
        setContactDetails(newContactDetails);
        dispatch(changeInputValue({name,value}));
    };


    const closePopUp = () => {
        dispatch(readyForNewOrder());
        setActiveElement('contact-details-form');
        setMessage('');
        setImageLink('');
    };

    const getMessageAndImageLink = (generatedMessage, generatedImageLink) =>{
        setMessage(generatedMessage);
        setImageLink(generatedImageLink);
        setActiveElement('pop-up');
    };


    const orderButtonOnClick = () => {
        const date = new Date().toLocaleString();
        const newOrder = {
            address,
            userId,
            orderSum: (orderCost + displayedDeliveryCost),
            exchangeRate,
            date,
            order: JSON.stringify(order),
            phoneNumber
        };
        if (address && phoneNumber && orderCost) {
            dispatch(insertOrder(newOrder));
        }
    };


    const dispatch = props.dispatch;
    return(
        <section className="order-details">
            { activeElement === "contact-details-form" &&
               <Fragment>
                   <h1 className="order-details__title">Contact details</h1>
                   <form className="order-details__form">
                       {contactDetails.map(input => {
                               return <FormInput key={input.name}
                                                 title={input.title}
                                                 name={input.name}
                                                 value={input.value}
                                                 changeInputValue={changeInputValueHandler}/>
                           }
                       )}
                   </form>
                   <div className="order-details__order-info">
                       <OrderTotalInfo sign={sign}
                                       deliveryCost={displayedDeliveryCost}
                                       orderCost={orderCost}
                                       getMessageAndImageLink={getMessageAndImageLink}>
                       </OrderTotalInfo>
                   </div>

                   <button className="order-details__order-button button send"
                           onClick={orderButtonOnClick}>Order</button>
               </Fragment>
            }
            {activeElement === "pop-up" &&
                <PopUp message={message}
                       imageLink={imageLink}
                       closePopUp={closePopUp}>
                </PopUp>
            }
        </section>
    );
};

const mapStateToProps = state => {
    return {
        state: state
    }
};
export default connect(mapStateToProps, null)(ContactDetailsForm)