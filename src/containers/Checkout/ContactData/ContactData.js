import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class NombreClase extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

        //alert('Continuamos!');

        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Ignacio Baptista',
                adress: {
                    street: 'Corrientes 123',
                    zipCode: '1414',
                    country: 'Argentina'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {

        let form = (
            <form>
                <input type="text" name="name" placeholder="Tu nombre" />
                <input type="email" name="name" placeholder="Tu email" />
                <input type="text" name="street" placeholder="Tu calle" />
                <input type="text" name="postal" placeholder="Tu codigo postal" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Ingrese su informacion de contacto</h4>
                {form}
            </div>
        );
    }
}

export default NombreClase;