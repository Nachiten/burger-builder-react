import React from 'react';

import classes from './Input.css'

const input = props => {

    let inputElement = null;
    const inputClassesArray = [classes.InputElement];

    if (props.invalid && props.touched) {
        inputClassesArray.push(classes.Invalid);
    }

    const inputClasses = inputClassesArray.join(' ');

    switch (props.inputtype) {
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses}
                {...props.elementConfig}
                value={props.value} onChange={props.changed} />;
            break;
        case ('select'):
            //console.log("Hay un select");
            inputElement = (
                <select
                    className={inputClasses}
                    value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(optionElem => (
                        <option
                            key={optionElem.value}
                            value={optionElem.value}>
                            {optionElem.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            //console.log("Hay un input");
            inputElement = <input
                className={inputClasses}
                {...props.elementConfig}
                value={props.value} onChange={props.changed} />;
            break;
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>Por favor, ingrese un valor valido.</p>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );

}

export default input;