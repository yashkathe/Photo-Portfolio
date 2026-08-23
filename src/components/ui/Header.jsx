import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <Motion.header
      className="site-header"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <Link className="site-brand" to="/">Yash Kathe</Link>
      <nav className="site-nav" aria-label="Main navigation">
        <Link to="/">Timeline</Link>
        <Link to="/featured">Featured</Link>
      </nav>
    </Motion.header>
  )
}

export default Header