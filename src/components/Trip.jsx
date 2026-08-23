import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Trip.css'

const tripRevealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
  active: { opacity: 1, y: 0 },
}
const tripRevealViewport = { once: true, amount: 0.3 }
const tripRevealTransition = { duration: 0.6, ease: 'easeOut' }

const tripPhotoRest = { opacity: 0.65, filter: 'blur(0px)' }
const tripPhotoHover = { opacity: 0.6, filter: 'blur(4px)' }
const tripPhotoTransition = { duration: 0.7, ease: 'easeOut' }

const tripCopyRest = { top: '90%', y: '-50%', scale: 1 }
const tripCopyHover = { top: '50%', y: '-50%', scale: 1.1 }

const tripDetailsRest = { opacity: 1 }
const tripDetailsHover = { opacity: 1 }

const tripDetailsTransition = {
  duration: 0.45,
  ease: 'easeOut',
}

const tripCopyTransition = {
  duration: 1,
  ease: [0.22, 1, 0.36, 1],
}

function Trip({ slug, title, location, photo }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link className="trip-link" to={`/trips/${slug}`}>
      <Motion.article
        className="trip"
        variants={tripRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={tripRevealViewport}
        transition={tripRevealTransition}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {photo ? (
          <Motion.img
            className="trip-photo"
            src={photo}
            alt={`${title} in ${location}`}
            animate={isHovered ? tripPhotoHover : tripPhotoRest}
            transition={tripPhotoTransition}
          />
        ) : (
          <Motion.div
            className="trip-photo"
            aria-hidden="true"
            animate={isHovered ? tripPhotoHover : tripPhotoRest}
            transition={tripPhotoTransition}
          />
        )}
        <Motion.div
          className="trip-details"
          animate={isHovered ? tripDetailsHover : tripDetailsRest}
          transition={tripDetailsTransition}
        >
          <Motion.div
            className="trip-copy"
            animate={isHovered ? tripCopyHover : tripCopyRest}
            transition={tripCopyTransition}
          >
            <h2>{title}</h2>
          </Motion.div>
        </Motion.div>
      </Motion.article>
    </Link>
  )
}

export default Trip