import React, {useState} from 'react';
import {connect} from "react-redux";
import {hasAuthorized} from "../redux/actions";
import FormInput from './FormInput.js';


const LogInForm = props => {
    const login = '';
    const password = '';
    const getMessageAndImageLink = props.getMessageAndImageLink;
    const checkedFormClass = props.checkedFormClass;


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

    const logInButtonOnclick = () =>{
        let copy = [...logInInfo];
        let data = {};
        copy.forEach(field => {
            data[field.name] = field.value
        });
        fetch('http://liptonv.pythonanywhere.com/login_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)})
            .then(res => res.json())
            .then(data => {
                if(data) {
                    dispatch(hasAuthorized(data.id));
                }
            })
            .catch(() => {
                getMessageAndImageLink('Authorized failed. Wrong login or password', '15NOFC7wqYc4kb7D2RzYbGWbkn466-Gr1');
            })
    };

    const dispatch = props.dispatch;
    return(
        <section className={checkedFormClass}>
            <h1>Log in</h1>
            <form>
                {logInInfo.map(input => {
                    return <FormInput key={`log-in-${input.name}`}
                               title={input.title}
                               name={input.name}
                               value={input.value}
                               changeInputValue={changeInputValue}/>
                    }
                )}
            </form>
            <button className="button send"
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