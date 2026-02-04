import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AnimationProvider } from './contexts/AnimationContext'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AnimationProvider>
                <App />
            </AnimationProvider>
        </BrowserRouter>
    </StrictMode>,
)
