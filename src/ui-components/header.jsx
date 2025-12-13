import React from "react";

import classes from './header.module.css'

const Header = () => {

    return (
        <>
            <div>
                <h1 className={classes.header}>Yash Kathe</h1>
                <p>📍Mountain View, California</p>
                <ul>
                    <li>California</li>
                </ul>
            </div>
        </>

    )
}


export default Header
