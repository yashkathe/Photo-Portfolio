import { motion as Motion } from 'framer-motion'
import './Header.css'

function Header() {
  return (
    <Motion.header
      className="site-header"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <a href="/">Yash Kathe</a>
    </Motion.header>
  )
}

export default Header