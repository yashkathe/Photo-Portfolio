import './Trip.css'

function Trip({ location, duration, photo, date }) {
  return (
    <article className="trip">
      {photo ? (
        <img className="trip-photo" src={photo} alt={location} />
      ) : (
        <div className="trip-photo" aria-hidden="true" />
      )}
      <div className="trip-details">
        <div className="trip-copy">
          <h2>{location}</h2>
          {date && <p>{date}</p>}
          {duration && <p>{duration}</p>}
        </div>
      </div>
    </article>
  )
}

export default Trip