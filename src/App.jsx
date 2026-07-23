import React, { useState, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import classes from './App.module.css'

import Header from './ui-components/header'
import Photos from './photos/photos'

function App() {
    const location = useLocation();
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const isGalleryPage = location.pathname === '/' || location.pathname === '/photos';

    useEffect(() => {
        document.title = 'Yash Kathe | Photography Portfolio'
    }, [])

    useEffect(() => {
        if (!isGalleryPage) {
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
    }, [lastScrollY, isGalleryPage]);

    return (
        <React.Fragment>
            <div>
                {isGalleryPage && <Header isVisible={isHeaderVisible} />}
                <div className={classes.content}>
                    <Routes>
                        <Route path="/" element={<Photos/>} />
                        <Route path="/photos" element={<Photos/>} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </div>
        </React.Fragment>
    )
}

export default App
