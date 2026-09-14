import { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import PhotoModal from '../components/PhotoModal'
import { matchesPhotoFilter, photoFilters } from '../data/photoFilters'
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
  const [expandedFilter, setExpandedFilter] = useState(null)
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
          <div className="gallery-filter-group" key={filter.value}>
            <Motion.button
              animate={{ opacity: activeFilter === filter.value ? 1 : 0.7 }}
              className={activeFilter === filter.value ? 'is-active' : ''}
              type="button"
              onClick={() => {
                setActiveFilter(filter.value)
                setExpandedFilter(filter.children ? filter.value : null)
              }}
              aria-pressed={activeFilter === filter.value}
              aria-expanded={filter.children ? expandedFilter === filter.value : undefined}
            >
              {filter.label}
              {filter.children && <span className="gallery-filter-mark">+</span>}
            </Motion.button>
            <AnimatePresence initial={false}>
              {filter.children && expandedFilter === filter.value && (
                <Motion.div
                  className="gallery-filter-children"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                >
                  {filter.children.map((child) => (
                    <button
                      className={activeFilter === child.value ? 'is-active' : ''}
                      key={child.value}
                      type="button"
                      onClick={() => setActiveFilter(child.value)}
                      aria-pressed={activeFilter === child.value}
                    >
                      {child.label}
                    </button>
                  ))}
                </Motion.div>
              )}
            </AnimatePresence>
          </div>
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