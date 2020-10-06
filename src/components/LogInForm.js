import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import axios from 'axios';

import {hasAuthorized} from "../redux/actions";
import FormInput from './FormInput.js';

const LogInForm = props => {
    const login = '';
    const password = '';
    const getMessageAndImageLink = props.getMessageAndImageLink;


    const [logInInfo, setLogInInfo] = useState([
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
            if(e.keyCode === 13) {
                logInButtonOnclick();
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    const changeInputValue = e => {
        const {name, value} = e.target;
        let newLogInInfo = [...logInInfo];
        newLogInInfo.map(input => {
           if(input.name === name)
               input.value = value;
            return input
        });
        setLogInInfo(newLogInInfo);
    };

    const logInButtonOnclick = () => {
        let copy = [...logInInfo];
        let data = {};
        const flag = copy.every(field => {
            data[field.name] = field.value;
            return field.value

        });
        if(flag)
            axios
                .post('https://liptonv.pythonanywhere.com/login_user', data)
                .then(data => data.data)
                .then(data => {
                    if(data.id)
                        dispatch(hasAuthorized(data.id));
                })
                .catch(() => {
                    getMessageAndImageLink('Authorized failed. Wrong login or password', '15NOFC7wqYc4kb7D2RzYbGWbkn466-Gr1');
                });
    };

    const dispatch = props.dispatch;
    return(
        <section className="form">
            <h1 className="form__title">Log in</h1>
            <form className="form__body">
                {logInInfo.map(input => {
                    return <FormInput key={`log-in-${input.name}`}
                               title={input.title}
                               name={input.name}
                               value={input.value}
                               changeInputValue={changeInputValue}/>
                    }
                )}
            </form>
            <button className="form__button button send"
                    onClick={logInButtonOnclick}>Send</button>
        </section>
    );
};

const mapStateToProps = state => {
    return {
        state: state
    }
};
export default connect(mapStateToProps, null)(LogInForm)