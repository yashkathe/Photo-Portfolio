import './index.css'
import { useRef } from 'react'
import { motion as Motion, useScroll } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Trip from './components/Trip'
import Header from './components/ui/Header'
import Footer from './components/ui/Footer'
import Featured from './pages/Featured'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import TripPage from './pages/TripPage'
import trips from './data/trips'

const dateHidden = { opacity: 0, y: 12 }
const dateVisible = { opacity: 1, y: 0 }
const dateViewport = { once: true, amount: 0.3 }
const dateTransition = { duration: 0.5, ease: 'easeOut', delay: 0.15 }

function Timeline() {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 20%'],
  })
  const progressStyle = {
    scaleY: scrollYProgress,
    transformOrigin: 'top',
  }

  return (
    <section ref={timelineRef} className="timeline" aria-label="Travel timeline">
      <Motion.div className="timeline-progress" style={progressStyle} aria-hidden="true" />
      {trips.map((trip) => (
        <div className="timeline-entry" key={trip.slug}>
          <span className="timeline-marker" aria-hidden="true" />
          <Trip {...trip} photo={trip.photos[0]?.link} />
          <Motion.time
            className="timeline-date"
            initial={dateHidden}
            whileInView={dateVisible}
            viewport={dateViewport}
            transition={dateTransition}
          >
            <span className="timeline-location">{trip.location}</span>
            <span>{trip.date}</span>
            <span className="timeline-photo-count">
              {trip.photos.length} {trip.photos.length === 1 ? 'photo' : 'photos'}
            </span>
          </Motion.time>
        </div>
      ))}
    </section>
  )
}

function App() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <main className={`shell ${isHome ? 'home-shell' : ''}`}>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips" element={<Timeline />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/trips/:slug" element={<TripPage />} />
      </Routes>

      {!isHome && <Footer />}
    </main>
  )
}

export default App