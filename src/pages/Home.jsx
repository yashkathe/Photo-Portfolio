import { useEffect, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import trips from '../data/trips'
import './Home.css'

const slideshowPhotos = trips
  .flatMap((trip) => trip.photos)
  .filter((photo) => photo.category === 'landscape')

const fallbackPhotoColor = 'rgb(137 138 131)'

function samplePhotoColor(photoLink, onColorSampled) {
  const image = new window.Image()
  image.crossOrigin = 'anonymous'
  image.onload = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d', { willReadFrequently: true })

    if (!context) {
      return
    }

    canvas.width = 24
    canvas.height = 24
    context.drawImage(image, 0, 0, canvas.width, canvas.height)

    try {
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
      let red = 0
      let green = 0
      let blue = 0
      let samples = 0

      for (let index = 0; index < pixels.length; index += 4) {
        if (pixels[index + 3] === 0) {
          continue
        }

        red += pixels[index]
        green += pixels[index + 1]
        blue += pixels[index + 2]
        samples += 1
      }

      if (samples > 0) {
        onColorSampled(
          `rgb(${Math.round(red / samples)} ${Math.round(green / samples)} ${Math.round(blue / samples)})`,
        )
      }
    } catch {
      onColorSampled(fallbackPhotoColor)
    }
  }
  image.onerror = () => onColorSampled(fallbackPhotoColor)
  image.src = photoLink
}

function Home() {
  const [photoIndex, setPhotoIndex] = useState(() =>
    Math.floor(Math.random() * slideshowPhotos.length),
  )
  const [photoColor, setPhotoColor] = useState(fallbackPhotoColor)
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
    if (currentPhoto) {
      samplePhotoColor(currentPhoto.link, setPhotoColor)
    }
  }, [currentPhoto])

  return (
    <section className="home-page" style={{ '--home-photo-color': photoColor }}>
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
        <p className="eyebrow">My photographic journal</p>
        <h1>Yash Kathe</h1>
        {/* <p className="home-description">From the road, coast, and wilderness.</p> */}
        <nav className="home-actions" aria-label="Explore photography">
          <Link to="/trips">Explore trips</Link>
          <Link to="/gallery">View gallery</Link>
        </nav>
        {currentPhoto && <p className="home-caption">{currentPhoto.title}</p>}
      </Motion.div>
    </section>
  )
}

export default Home