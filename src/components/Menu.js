import React, {useState, useEffect} from 'react'
import PizzaMenuItem from './PizzaMenuItem.js'
import '../assets/styles/menu.css'


const Menu = () => {
    useEffect(() => {
        fetchPizzas();
    }, []);

    const [pizzas, setPizzas] = useState([]);

    const fetchPizzas = () => {
        fetch("https://liptonv.pythonanywhere.com/get_pizza")
            .then(res => res.json())
            .then(data => {
                let pizzas = data.pizzas.filter(pizza => {
                    return pizza
                });
                setPizzas(pizzas);
            });
    };

    return(
            <section id='menu'>
                <ul>
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
