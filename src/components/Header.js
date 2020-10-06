import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import CartIcon from './CartIcon.js'
import {logOut, changeExchangeRate} from '../redux/actions'
import '../assets/styles/header.scss'

const Header = props => {
    const pizzas = props.state.order.pizzas;
    const exchangeRate = props.state.exchangeRate;
    const isAuthorized = props.state.isAuthorized;

    const [exchangeRateSignLink, setExchangeRateSignLink] = useState('');
    const [totalPizzasQuality, setTotalPizzasQuality] = useState('');
    const [authorisedStatus, setAuthorisedStatus] = useState({
        message: '',
        imageLink: ''
    });
    const [privateMenuItemClass, setPrivateMenuItemClass] = useState('');
    const [publicMenuItemClass, setPublicMenuItemClass] = useState('');

    const getTotalPizzasQuality = () => {
        return pizzas.reduce((total, pizza) => {
            return total + pizza.counter
        }, 0);
    };

    useEffect(() => {
        setExchangeRateSignLink(getExchangeRateSignLink());
    }, [exchangeRate]);

    useEffect(() => {
        setTotalPizzasQuality(getTotalPizzasQuality());
    }, [pizzas]);

    useEffect(() => {
        if(isAuthorized)
            setAuthorisedStatus({
                message: 'You are authorized ',
                imageLink: 'https://drive.google.com/uc?export=view&id=1KUFWJOSaU8K1YvnvkKTD2lrYDv3b5LPq'
            });
        else
            setAuthorisedStatus({message: '', imageLink: ''});

    }, [isAuthorized]);

    const getExchangeRateSignLink = () => {
        let exchangeRateSignLink;
        switch (props.state.exchangeRate) {
            case 'dollar': {
                exchangeRateSignLink = '1Uol01luejIPhLtlJ30bZFMwfKfxDtskQ';
                break;
            }
            case 'euro': {
                exchangeRateSignLink= '1unCXIPsk41IfaBidpd77u21SbsdfeBPj'
            }
        }
        return exchangeRateSignLink;
    };

    const exchangeRateSignClickHandler = () => {
        let newExchangeRate;
        exchangeRate === 'dollar' ? newExchangeRate = 'euro' : newExchangeRate = 'dollar';
        dispatch(changeExchangeRate(newExchangeRate));
    };
    const logOutOnClick = () => {
        dispatch(logOut());
    };
    const dispatch = props.dispatch;
    return(
            <nav className="header">
                <div className="header__body">
                    <div className="header__logo logo">
                        <img className="logo__image" src="https://drive.google.com/uc?export=view&id=1XUK4cd0QXMIvUOVGk9a4BrGvJPRQnwEL"/>
                        <aside className="logo__extra authorised-status">
                            <label className="authorised-status__test">{authorisedStatus.message}</label>
                            <img src={authorisedStatus.imageLink} className="authorised-status__image"/>
                        </aside>
                    </div>
                    <ul className="header__menu">
                        <li className="header__menu__link"><Link to='/menu'>Menu</Link></li>
                        { isAuthorized && <li className="header__menu__link"><Link to="/orders">Orders</Link></li> }
                        { isAuthorized && <li className="header__menu__link" onClick={logOutOnClick}><Link to='/'>Log out</Link></li> }
                        { !isAuthorized && <li className="header__menu__link" ><Link to="/checkout">Checkout</Link></li> }
                        <li className="header__menu__link"><img id="exchange-rate"
                                 src={`https://drive.google.com/uc?export=view&id=${exchangeRateSignLink}`}
                                 onClick={exchangeRateSignClickHandler}/>
                        </li>
                        <li className="header__menu__link"><Link to='/cart'>
                            <CartIcon counter={totalPizzasQuality}/>
                        </Link></li>
                    </ul>
                </div>
            </nav>
    );
};

const mapStateToProps = state => {
    return {
        state: state
    }
};
export default connect(mapStateToProps, null)(Header)