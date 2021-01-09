import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = props => {

    let clasesAgregadas = [classes.SideDrawer, classes.Close];

    if (props.open) {
        clasesAgregadas = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={clasesAgregadas.join(' ')}>

                <Logo height="11%" />

                <nav>
                    <NavigationItems />
                </nav>

            </div>
        </Aux>
    );
};


export default sideDrawer;