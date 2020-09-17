import React, {useState} from 'react';
import {connect} from "react-redux";
import {hasAuthorized} from "../redux/actions";
import FormInput from './FormInput.js';


const SignUpForm = props => {
    const login = '';
    const password = '';
    const getMessageAndImageLink = props.getMessageAndImageLink;
    const checkedFormClass = props.checkedFormClass;

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
       copy.forEach(field => {
           data[field.name] = field.value
       });
       fetch('https://liptonv.pythonanywhere.com/register_user', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json;charset=utf-8'
           },
           body: JSON.stringify(data)})
           .then(res => res.json())
           .then(data => {
               if(data.inserted_id) {
                   dispatch(hasAuthorized(data.inserted_id));
               }
               else {
                   getMessageAndImageLink('Sign up failed. Change login', '15NOFC7wqYc4kb7D2RzYbGWbkn466-Gr1');
               }
           });
    };

    const dispatch = props.dispatch;
    return(
        <section className={checkedFormClass}>
            <h1>Sign up</h1>
            <form>
                {signUpInfo .map(input => {
                    return <FormInput key={`sign-up-${input.name}`}
                               title={input.title}
                               name={input.name}
                               value={input.value}
                               changeInputValue={changeInputValue}/>
                    }
                )}
            </form>
            <button className="button send"
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
