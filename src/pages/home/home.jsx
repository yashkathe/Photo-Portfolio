import React from "react"
import { Link } from "react-router-dom"
import classes from './home.module.css'

const Home = () => {
    return (
        <div className={classes.home}>
            <div className={classes.overlay} />
            <div className={classes.content}>
                <h1 className={classes.title}>Yash Kathe</h1>
                <p className={classes.subtitle}>Mountain View, California</p>
                <Link to="/photos" className={classes.cta}>Gallery</Link>
            </div>
        </div>
    )
}

export default Home
