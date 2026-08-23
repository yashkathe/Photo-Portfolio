import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Trip.css'

const tripRevealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
  active: { opacity: 1, y: 0 },
}
const tripRevealViewport = { once: true, amount: 0.3 }
const tripRevealTransition = { duration: 0.6, ease: 'easeOut' }

const tripVignetteVariants = {
  inactive: { opacity: 0 },
  hidden: { opacity: 0 },
  visible: { opacity: 0 },
  active: { opacity: 0.65 },
}

const tripDetailsVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  active: { opacity: 1 },
}

const tripCopyVariants = {
  hidden: { top: '90%', x: 0, y: '-50%', scale: 1 },
  visible: { top: '90%', x: 0, y: '-50%', scale: 1 },
  active: { top: '50%', x: 0, y: '-50%', scale: 1.25 },
}

const tripDetailsTransition = {
  duration: 0.45,
  ease: 'easeOut',
}

const tripCopyTransition = {
  duration: 1,
  ease: [0.22, 1, 0.36, 1],
}

function Trip({ slug, location, photo }) {
  return (
    <Link className="trip-link" to={`/trips/${slug}`}>
      <Motion.article
        className="trip"
        variants={tripRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={tripRevealViewport}
        transition={tripRevealTransition}
        whileHover="active"
      >
        {photo ? (
          <img className="trip-photo" src={photo} alt={location} />
        ) : (
          <div className="trip-photo" aria-hidden="true" />
        )}
        <Motion.div
          className="trip-vignette"
          variants={tripVignetteVariants}
          transition={tripDetailsTransition}
          aria-hidden="true"
        />
        <Motion.div
          className="trip-details"
          variants={tripDetailsVariants}
          transition={tripDetailsTransition}
        >
          <Motion.div
            className="trip-copy"
            variants={tripCopyVariants}
            transition={tripCopyTransition}
          >
            <h2>{location}</h2>
          </Motion.div>
        </Motion.div>
      </Motion.article>
    </Link>
  )
}

export default Trip