import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from "react-router-dom";

import classes from './App.module.css'

import Header from '../src/ui-components/header'
import Home from './pages/home/home'
import Photos  from './pages/photos/photos'
import Gear from './pages/gear/gear'

const HOME_BACKGROUND_IMAGES = ['/home_page1.jpg', '/home_page2.jpg', '/home_page3.jpg'];

function App() {
    const location = useLocation();
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [homeBgImage] = useState(() =>
        HOME_BACKGROUND_IMAGES[Math.floor(Math.random() * HOME_BACKGROUND_IMAGES.length)]
    );
    const isPhotosPage = location.pathname === '/photos';
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        if (!isPhotosPage) {
            setIsHeaderVisible(true);
            return;
        }

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show header when at top 
            if (currentScrollY < 20) {
                setIsHeaderVisible(true);
            } 
            // Hide header when scrolling down
            else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsHeaderVisible(false);
            }  
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isPhotosPage]);

    return (
        <React.Fragment>
            <div>
                {isHomePage && (
                    <div
                        className={classes.homeBackground}
                        style={{ backgroundImage: `url(${homeBgImage})` }}
                        aria-hidden
                    />
                )}
                {!isHomePage && <Header isVisible={isHeaderVisible} />}
                <div className={`${classes.content} ${isHomePage ? classes.contentNoHeader : ''}`}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/photos" element={<Photos/>} />
                        <Route path="/gear" element={<Gear/>} />
                    </Routes>
                </div>
            </div>
        </React.Fragment>
    )
}

export default App
