import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAnimations } from "../contexts/AnimationContext";
import classes from './header.module.css'

const Header = ({ isVisible }) => {
    const { headerVariants } = useAnimations();
    const location = useLocation();

    return (
        <motion.header
            className={classes.header}
            variants={headerVariants}
            animate={isVisible ? "visible" : "hidden"}
            initial="visible"
        >
            <div className={classes.container}>
                <NavLink to='/' className={classes.logo}>
                    <h1>Yash Kathe</h1>
                </NavLink>
                <nav className={classes.nav}>
                    <ul className={classes.navList}>
                        <li>
                            <NavLink 
                                to='/photos' 
                                className={({ isActive }) => 
                                    isActive ? `${classes.navLink} ${classes.active}` : classes.navLink
                                }
                            >
                                Photos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to='/gear'
                                className={({ isActive }) => 
                                    isActive ? `${classes.navLink} ${classes.active}` : classes.navLink
                                }
                            >
                                Gear
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </motion.header>
    )
}

export default Header
