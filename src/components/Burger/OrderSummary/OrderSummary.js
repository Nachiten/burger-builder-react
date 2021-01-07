import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = props => {

    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        });

    return (
        <Aux>
            <h3 style={{textAlign: 'center'}}> {"<<"} Tu orden {">>"}</h3>
            <p>Una hamburguesa deliciosa con estos ingredientes:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>El precio total es: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continuar hacia el pago?</p>
            <Button clicked={props.purchaseCancelled} btnType="Danger">CANCELAR</Button>
            <Button clicked={props.purchaseContinued} btnType="Success">CONTINUAR</Button>
        </Aux>

    );

};

export default orderSummary;