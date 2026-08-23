import { Link, Navigate, useParams } from 'react-router-dom'
import trips from '../data/trips'
import './TripPage.css'

function TripPage() {
  const { slug } = useParams()
  const trip = trips.find((item) => item.slug === slug)

  if (!trip) {
    return <Navigate to="/" replace />
  }

  return (
    <section className="trip-page">
      <Link className="trip-page-back" to="/">Back to timeline</Link>
      <header className="trip-page-header">
        <h1>{trip.location}</h1>
        <time>{trip.date}</time>
      </header>
      <div className="trip-photo-grid">
        {trip.photos.length > 0 ? (
          trip.photos.map((photo) => (
            <img key={photo.link} src={photo.link} alt={photo.title || trip.location} />
          ))
        ) : (
          <p>Photos for this trip will appear here.</p>
        )}
      </div>
    </section>
  )
}

export default TripPage