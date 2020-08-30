import React, {useState} from 'react';

import SignUpForm from './SignUpForm.js'
import LogInForm from './LogInForm.js'
import PopUp from './PopUp.js'
import '../assets/styles/checkout.css'

const Checkout = () => {
    const [logInIsChecked, setLogInIsChecked] = useState(true);
    const [showPopUp, setShowPopUp] = useState('');
    const [message, setMessage] = useState('');
    const [imageLink, setImageLink] = useState('');

    const changeLogInIsChecked = () => {
        if(!logInIsChecked)
            setLogInIsChecked(!logInIsChecked);
    };
    const changeSignUpIsChecked = () => {
        if(logInIsChecked)
            setLogInIsChecked(!logInIsChecked);
    };

    const closePopUp = () => {
        setShowPopUp('');
        setMessage('');
        setImageLink('');
    };

    const getMessageAndImageLink = (generatedMessage, generatedImageLink) =>{
        setMessage(generatedMessage);
        setImageLink(generatedImageLink);
        setShowPopUp('show');
    };

    return(
        <section id="checkout">
            <ul id="checkout-nav">
                <li onClick={changeLogInIsChecked}>Log in</li>
                <li onClick={changeSignUpIsChecked}>Sign up</li>
            </ul>
            <LogInForm checkedFormClass={logInIsChecked ? 'form' : 'hidden'}
                       getMessageAndImageLink={getMessageAndImageLink}/>
            <SignUpForm checkedFormClass={logInIsChecked ? 'hidden' : 'form'}
                        getMessageAndImageLink={getMessageAndImageLink}/>
            <PopUp message={message}
                   imageLink={imageLink}
                   show={showPopUp}
                   closePopUp={closePopUp}>
            </PopUp>
        </section>
    );
};

export default Checkout