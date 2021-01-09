import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate(){
        console.log('Order Summary will update');
    }

    render() {

        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                )
            });

        return (

            <Aux>
                <h3 style={{ textAlign: 'center' }}> {"<<"} Tu orden {">>"}</h3>
                <p>Una hamburguesa deliciosa con estos ingredientes:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>El precio total es: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continuar hacia el pago?</p>
                <Button clicked={this.props.purchaseCancelled} btnType="Danger">CANCELAR</Button>
                <Button clicked={this.props.purchaseContinued} btnType="Success">CONTINUAR</Button>
            </Aux>


        );
    }
}

export default OrderSummary;