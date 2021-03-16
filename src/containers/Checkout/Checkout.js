import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);

        const ingredients = {};
        let price = 0;

        for (let param of query.entries()) {
            // ['salad', '3']

            if (param[0] === 'price'){
                price = param[1];
                continue;
            }

            ingredients[param[0]] = +param[1];
        }

        this.setState({ ingredients: ingredients, totalPrice: price });
    }

    continuarCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    cancelarCheckoutHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.cancelarCheckoutHandler}
                    checkoutContinued={this.continuarCheckoutHandler} />
                <Route 
                path={this.props.match.path + '/contact-data'} 
                render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            
            </div>
        );
    }
}

export default Checkout;