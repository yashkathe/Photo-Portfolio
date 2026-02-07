import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getRandomHomeImage } from "./homeSlides"
import HomePhotoTimer from "./components/HomePhotoTimer"
import classes from './home.module.css'

const TICK_MS = 1000
const TICKS_PER_PHOTO = 5

const Home = () => {
    const [currentUrl, setCurrentUrl] = useState(() => getRandomHomeImage())
    const [step, setStep] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setStep((s) => {
                const next = (s + 1) % TICKS_PER_PHOTO
                if (next === 0) setCurrentUrl(getRandomHomeImage())
                return next
            })
        }, TICK_MS)
        return () => clearInterval(id)
    }, [])

    return (
        <div className={classes.home}>
            <div
                className={classes.slide}
                style={{ backgroundImage: `url(${currentUrl})` }}
                aria-hidden
            />
            <div className={classes.overlay} />
            <div className={classes.content}>
                <h1 className={classes.title}>Yash Kathe</h1>
                <p className={classes.subtitle}>Mountain View, California</p>
                <Link to="/photos" className={classes.cta}>Gallery</Link>
            </div>
            <HomePhotoTimer step={step} />
        </div>
    )
}

export default Home
