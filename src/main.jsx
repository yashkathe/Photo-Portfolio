import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AnimationProvider } from './contexts/AnimationContext'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HashRouter>
            <AnimationProvider>
                <App />
            </AnimationProvider>
        </HashRouter>
    </StrictMode>,
)
