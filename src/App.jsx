import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from "react-router-dom";

import classes from './App.module.css'

import Header from './ui-components/header'
import Home from './home/home'
import Photos from './photos/photos'
import Gear from './gear/gear'

function App() {
    const location = useLocation();
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
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
