import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { RuleTester } from 'eslint';

class ContactData extends Component {

    state = {
        orderForm: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value:'',
                validation: {
                    required: true,
                    valid: false
                }
            },
            gender:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'selectGender', displayValue: 'Select your gender'},
                        {value: 'male', displayValue: 'Male'},
                        {value: 'female', displayValue: 'Female'}
                    ]
                },
                value:'',
                validation: {
                    required: true,
                    valid: false,
                    defaultValue: 'selectGender'
                }
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value:'',
                validation: {
                    required: true,
                    valid: false
                }
            },
            zipCode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value:'',
                validation: {
                    required: true,
                    valid: false
                }
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value:'',
                validation: {
                    required: true,
                    valid: false
                }
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value:'',
                validation: {
                    required: true,
                    valid: false
                }
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'selectDelivery', displayValue: 'Select your delivery method'},
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value:'',
                validation: {
                    required: true,
                    valid: false,
                    defaultValue: 'selectDelivery'
                }
            },
        },
        loading: false
    }

    componentDidMount() {
        console.log(this.state.orderForm);
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

        this.setState({ loading: true });

        const formData = {};

        for (let formElementId in this.state.orderForm){
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        console.log(formData);

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    checkValidity(value, formElement){
        let isValid = false;
        
        // if (formElement.validation.required){
        //     if(formElement.elementType === 'input'){
        //         isValid = value.trim() !== '';
        //     } else if (formElement.elementType === 'select'){
        //         isValid = value.trim() !== formElement.validation.defaultValue;
        //     }
        // }

        // if (formElement.validation.minLength){
        //     isValid = value.length >= formElement.validation.minLength;
        // }
        
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);

        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.validation.valid = this.checkValidity(updatedFormElement.value, updatedFormElement)

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        console.log(updatedFormElement);
        this.setState({orderForm: updatedOrderForm});
    }

    render() {

        const formElementsArray = [];

        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                    key={formElement.id}
                    inputtype={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" >ORDER</Button>
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

export default ContactData;