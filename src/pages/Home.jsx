import { useEffect, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import trips from '../data/trips'
import './Home.css'

const slideshowPhotos = trips
  .flatMap((trip) => trip.photos)
  .filter((photo) => photo.category === 'landscape')

function formatTimeSince(timestamp) {
  const minutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000))
  const days = Math.floor(minutes / 1440)
  const hours = Math.floor((minutes % 1440) / 60)
  const remainingMinutes = minutes % 60

  if (days > 0) {
    return `${days}d ${hours}h ago`
  }

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m ago`
  }

  return `${remainingMinutes}m ago`
}

function Home() {
  const [photoIndex, setPhotoIndex] = useState(() =>
    Math.floor(Math.random() * slideshowPhotos.length),
  )
  const [lastUpdatedLabel, setLastUpdatedLabel] = useState(() =>
    formatTimeSince(new Date(__LAST_UPDATED__).getTime()),
  )
  const currentPhoto = slideshowPhotos[photoIndex]

  useEffect(() => {
    if (slideshowPhotos.length < 2) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setPhotoIndex((currentIndex) => (currentIndex + 1) % slideshowPhotos.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLastUpdatedLabel(formatTimeSince(new Date(__LAST_UPDATED__).getTime()))
    }, 60000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="home-page">
      <AnimatePresence initial={false}>
        {currentPhoto && (
          <Motion.img
            className="home-image"
            key={currentPhoto.link}
            src={currentPhoto.link}
            alt={currentPhoto.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>
      <div className="home-overlay" aria-hidden="true" />
      <Motion.div
        className="home-content"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h1>Yash Kathe</h1>
        {/* <p className="home-description">From the road, coast, and wilderness.</p> */}
        {/* <nav className="home-actions" aria-label="Explore photography">
          <Link to="/trips">Explore trips</Link>
          <Link to="/gallery">View gallery</Link>
        </nav> */}
        <p className="home-updated">Last updated website: {lastUpdatedLabel}</p>
        {currentPhoto && <p className="home-caption">{currentPhoto.title}</p>}
      </Motion.div>
    </section>
  )
}

export default Home