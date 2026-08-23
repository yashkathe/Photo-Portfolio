import { useEffect } from 'react'
import { motion as Motion } from 'framer-motion'
import './PhotoModal.css'

const modalInitial = { opacity: 0, y: 10 }
const modalAnimate = {
  opacity: 1,
  y: 0,
  transition: { duration: 0.5, ease: 'easeOut' },
}
const modalExit = {
  opacity: 0,
  y: 40,
  transition: { duration: 0.3, ease: 'easeOut' },
}

function PhotoModal({ photo, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!photo) {
    return null
  }

  return (
    <Motion.div
      className="photo-modal"
      initial={modalInitial}
      animate={modalAnimate}
      exit={modalExit}
      onClick={onClose}
      role="presentation"
    >
      <div className="photo-modal-content" onClick={(event) => event.stopPropagation()}>
        <img src={photo.link} alt={photo.title} />
        <p>{photo.title}</p>
      </div>
    </Motion.div>
  )
}

export default PhotoModal