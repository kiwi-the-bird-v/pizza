import React, {useState, useEffect, useRef} from 'react'
import {connect} from "react-redux"
import axios from "axios"

import {hasAuthorized} from "../redux/actions"
import FormInput from './FormInput.js'


const SignUpForm = props => {
    const login = '';
    const password = '';
    const getMessageAndImageLink = props.getMessageAndImageLink;

    const [signUpInfo, setSignUpInfo] = useState([
        {
            name: 'login',
            value: login,
            title: 'Login',
        },
        {
            name: 'password',
            value: password,
            title: 'Password'
        }
    ]);

    useEffect(() => {
        const onKeyDown = e => {
            if(e.keyCode === 13)
                signUpButtonOnclick();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    const changeInputValue = e => {
        const {name, value} = e.target;
        let newSignUpInfo = [...signUpInfo];
        newSignUpInfo.map(input => {
           if(input.name === name)
               input.value = value;
            return input
        });
        setSignUpInfo(newSignUpInfo );
    };

    const signUpButtonOnclick = () =>{
       let copy = [...signUpInfo];
       let data = {};
       const flag = copy.every(field => {
           data[field.name] = field.value;
           return field.value

       });
       if(flag)
            axios
                .post('https://liptonv.pythonanywhere.com/register_user', data)
                .then(res => res.data)
                .then(data => {
                    data.inserted_id ? dispatch(hasAuthorized(data.inserted_id)) : getMessageAndImageLink('Sign up failed. Change login', '15NOFC7wqYc4kb7D2RzYbGWbkn466-Gr1')
                });
    };

    const dispatch = props.dispatch;
    return(
        <section className="form">
            <h1 className="form__title">Sign up</h1>
            <form className="form__body">
                {signUpInfo .map(input => {
                    return <FormInput key={`sign-up-${input.name}`}
                               title={input.title}
                               name={input.name}
                               value={input.value}
                               changeInputValue={changeInputValue}/>
                    }
                )}
            </form>
            <button className="form__button button send"
                    onClick={signUpButtonOnclick}>Send</button>
        </section>
    );
};

const mapStateToProps = state => {
    return {
        state: state
    }
};
export default connect(mapStateToProps, null)(SignUpForm)