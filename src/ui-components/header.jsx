import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAnimations } from "../contexts/AnimationContext";
import classes from './header.module.css'

const Header = ({ isVisible, mobileLayout, onToggleMobileLayout }) => {
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
                <nav className={classes.nav} aria-label="Gallery layout control">
                    {location.pathname === '/' || location.pathname === '/photos' ? (
                        <button
                            type="button"
                            className={classes.layoutToggleButton}
                            onClick={onToggleMobileLayout}
                            aria-label={mobileLayout === 'grid' ? 'Switch to one-by-one layout' : 'Switch to grid layout'}
                        >
                            {mobileLayout === 'grid' ? (
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M5 5h14v4H5zM5 10h14v4H5zM5 15h14v4H5z" />
                                </svg>
                            )}
                        </button>
                    ) : null}
                </nav>
            </div>
        </motion.header>
    )
}

export default Header
