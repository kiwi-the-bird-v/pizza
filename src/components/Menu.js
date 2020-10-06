import React, {useState, useEffect} from 'react'
import PizzaMenuItem from './PizzaMenuItem.js'
import '../assets/styles/menu.scss'
import axios from "axios";
import {hasAuthorized} from "../redux/actions";


const Menu = () => {
    useEffect(() => {
        fetchPizzas();
    }, []);

    const [pizzas, setPizzas] = useState([]);

    const fetchPizzas = () => {
        axios
            .get('https://liptonv.pythonanywhere.com/get_pizza')
            .then(res => res.data)
            .then(data => {
                let pizzas = data.pizzas.filter(pizza => {
                    return pizza
                });
                setPizzas(pizzas);
            });
    };

    return(
            <section className="menu">
                <ul className="menu__list">
                    {pizzas.map(pizza => {
                        return <PizzaMenuItem key = {pizza.title}
                                              pizza = {pizza}
                        />}
                    )}
                </ul>
            </section>
    );
};

export default Menu