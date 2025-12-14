import React from 'react'
import { Route, Routes } from "react-router-dom";

import classes from './App.module.css'

import Header from '../src/ui-components/header'
import Albums  from './pages/albums/albums'
import Gear from './pages/gear/gear'

function App() {

    return (
        <React.Fragment>
            <div>
                <header className={classes.header}>
                    <Header/>
                </header>
                <div className={classes.content}>
                    <Routes>
                        <Route path="/albums" element={<Albums/>} />
                        <Route path="/gear" element={<Gear/>} />
                    </Routes>
                </div>
            </div>
        </React.Fragment>
    )
}

export default App
