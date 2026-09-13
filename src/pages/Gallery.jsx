import { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import PhotoModal from '../components/PhotoModal'
import {
  isFilterIncluded,
  matchesPhotoFilter,
  photoFilters,
} from '../data/photoFilters'
import trips from '../data/trips'
import './Gallery.css'

const allPhotos = trips.flatMap((trip) =>
  trip.photos.map((photo) => ({
    ...photo,
    tripTitle: trip.title,
    tripDate: trip.date,
  })),
)

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const visiblePhotos = allPhotos.filter((photo) => matchesPhotoFilter(photo, activeFilter))

  return (
    <section className="gallery-page">
      <header className="gallery-header">
        <div>
          <p className="eyebrow">The complete collection</p>
          <h1>Gallery</h1>
        </div>
        <p className="gallery-count" aria-live="polite">
          {visiblePhotos.length} {visiblePhotos.length === 1 ? 'photo' : 'photos'}
        </p>
      </header>

      <div className="gallery-filters" role="group" aria-label="Filter photos by category">
        {photoFilters.map((filter) => (
          <Motion.button
            animate={{
              opacity: activeFilter === filter.value || isFilterIncluded(activeFilter, filter.value)
                ? 1
                : 0.7,
              scale: isFilterIncluded(activeFilter, filter.value) ? 1.03 : 1,
            }}
            className={`${activeFilter === filter.value ? 'is-active' : ''} ${
              isFilterIncluded(activeFilter, filter.value) ? 'is-included' : ''
            }`}
            key={filter.value}
            title={
              isFilterIncluded(activeFilter, filter.value)
                ? `${filter.label} included in ${
                    photoFilters.find((item) => item.value === activeFilter)?.label
                  }`
                : undefined
            }
            type="button"
            onClick={() => setActiveFilter(filter.value)}
            aria-pressed={activeFilter === filter.value}
            aria-label={
              isFilterIncluded(activeFilter, filter.value)
                ? `${filter.label}, included in the ${
                    photoFilters.find((item) => item.value === activeFilter)?.label
                  } filter`
                : filter.label
            }
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {filter.label}
            {isFilterIncluded(activeFilter, filter.value) && (
              <span className="gallery-filter-mark" aria-hidden="true">
                +
              </span>
            )}
          </Motion.button>
        ))}
      </div>

      <div className="gallery-grid">
        {visiblePhotos.map((photo) => (
            <button
            className="gallery-photo-button"
              key={photo.link}
              type="button"
              onClick={() => setSelectedPhoto(photo)}
          >
              <img src={photo.link} alt={photo.title || photo.tripTitle} loading="lazy" />
              <span className="gallery-photo-caption">
                <strong>{photo.title}</strong>
                <span>{photo.tripTitle}</span>
              </span>
            </button>
        ))}
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

export default Gallery