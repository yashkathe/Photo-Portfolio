import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import PhotoModal from '../components/PhotoModal'
import trips from '../data/trips'
import './TripPage.css'

function TripPage() {
  const { slug } = useParams()
  const trip = trips.find((item) => item.slug === slug)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  if (!trip) {
    return <Navigate to="/" replace />
  }

  return (
    <section className="trip-page">
      <Link className="trip-page-back" to="/">Back to timeline</Link>
      <header className="trip-page-header">
        <h1>{trip.title}</h1>
        <time>{trip.date}</time>
      </header>
      <div className="trip-photo-grid">
        {trip.photos.length > 0 ? (
          trip.photos.map((photo) => (
            <button
              className="trip-photo-button"
              key={photo.link}
              type="button"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img src={photo.link} alt={photo.title || trip.location} />
            </button>
          ))
        ) : (
          <p>Photos for this trip will appear here.</p>
        )}
      </div>
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoModal
            key={selectedPhoto.link}
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default TripPage