import React from 'react';

import classes from './Input.css'

const input = props => {

    let inputElement = null;

    switch (props.inputtype) {
        case ('textarea'):
            inputElement = <textarea
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value} onChange={props.changed} />;
            break;
        case ('select'):
            //console.log("Hay un select");
            inputElement = (
                <select
                    className={classes.InputElement}
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
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value} onChange={props.changed} />;
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

}

export default input;