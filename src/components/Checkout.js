import React, {useState} from 'react'

import SignUpForm from './SignUpForm.js'
import LogInForm from './LogInForm.js'
import PopUp from './PopUp.js'
import '../assets/styles/checkout.scss'

const Checkout = () => {
    const [activeElement, setActiveElement] = useState('log-in-form');
    const [message, setMessage] = useState('');
    const [imageLink, setImageLink] = useState('');


    const changeActiveForm = e => {
        setActiveElement(e.target.getAttribute("data-name"));
    };

    const closePopUp = () => {
        setActiveElement("log-in-form");
        setMessage('');
        setImageLink('');
    };

    const getMessageAndImageLink = (generatedMessage, generatedImageLink) => {
        setActiveElement("pop-up");
        setMessage(generatedMessage);
        setImageLink(generatedImageLink);
    };

    return(
        <section className="checkout">
            <ul className="checkout__menu">
                <li onClick={changeActiveForm} className="checkout__link" data-name="log-in-form">Log in</li>
                <li onClick={changeActiveForm} className="checkout__link" data-name="sign-up-form">Sign up</li>
            </ul>
            <div className="checkout__form">
                { activeElement === "log-in-form" && <LogInForm getMessageAndImageLink={getMessageAndImageLink}/> }
                { activeElement === "sign-up-form" && <SignUpForm getMessageAndImageLink={getMessageAndImageLink}/> }
            </div>
            { activeElement === "pop-up" && <PopUp message={message}
                   imageLink={imageLink}
                   closePopUp={closePopUp}>
            </PopUp>} }
        </section>
    );
};

export default Checkout