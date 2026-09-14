import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Header.css'

const headerInitial = { opacity: 0, y: -8 }
const headerAnimate = { opacity: 1, y: 0 }
const headerTransition = { duration: 0.45, ease: 'easeOut' }

function Header() {
  return (
    <Motion.header
      className="site-header"
      initial={headerInitial}
      animate={headerAnimate}
      transition={headerTransition}
    >
      <Link className="site-brand" to="/">Yash Kathe</Link>
      <nav className="site-nav" aria-label="Main navigation">
        <Link to="/trips">Trips</Link>
        <Link to="/gallery">Gallery</Link>
      </nav>
    </Motion.header>
  )
}

export default Header