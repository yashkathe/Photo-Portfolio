import React from "react";
import { NavLink } from "react-router-dom";

import classes from './header.module.css'

const Header = () => {

    return (
        <React.Fragment>
            <div className={classes.parent}>
                <NavLink to='/'><h1>Yash Kathe</h1></NavLink>
                <p>📍Mountain View, California</p>
                <ul>
                    <li>
                        <NavLink to='/albums'>Albums</NavLink>
                    </li>
                    <li>
                        <NavLink to='/gear'>Gear</NavLink>
                    </li>
                </ul>
            </div>
        </React.Fragment>

    )
}


export default Header
