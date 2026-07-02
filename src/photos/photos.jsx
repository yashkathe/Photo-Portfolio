import React, { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import classes from './photos.module.css'
import PhotoModal from './components/PhotoModal'
import Spinner from "../ui-components/spinner"
import { useAnimations } from '../contexts/AnimationContext'
import { getSeededPhotoOrder, shufflePhotos } from './photoOrder'
import { PHOTO_CATEGORY_ENTRIES, PHOTO_CATEGORY_MAP } from './photoCategories'

const PHOTO_FILES = ['/photos-1.json', '/photos-2.json', '/photos-3.json']
const DEFAULT_FILTERS = Object.values(PHOTO_CATEGORY_MAP).map(category => category.tag)

const filterItemVariants = {
    hidden: {
        opacity: 0,
        scale: 0.94,
        y: 8,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.22,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        opacity: 0,
        scale: 0.92,
        y: -8,
        transition: {
            duration: 0.18,
            ease: 'easeIn',
        },
    },
}

const photoGridVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.02,
        },
    },
}

const Photos = () => {
    const [photos, setPhotos] = useState([])
    const [activeFilters, setActiveFilters] = useState(DEFAULT_FILTERS)
    const [currentFileIndex, setCurrentFileIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const sentinelRef = useRef(null)
    const initializedRef = useRef(false)
    const inFlightFilesRef = useRef(new Set())
    const fileOrderRef = useRef(getSeededPhotoOrder(PHOTO_FILES))
    const activeFilterSet = new Set(activeFilters)
    const visiblePhotos = photos.filter(photo => activeFilterSet.has(photo.tag))

    // Load initial photos
    useEffect(() => {
        if (initializedRef.current) return
        initializedRef.current = true
        fetchPhotos(0)
    }, [])

    const fetchPhotos = (fileIndex) => {
        const filePath = fileOrderRef.current[fileIndex]
        if (!filePath || inFlightFilesRef.current.has(filePath)) return
        inFlightFilesRef.current.add(filePath)

        setIsLoading(true)
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error('No more pages')
                return response.json()
            })
            .then(data => {
                const newPhotos = data.photos || []
                if (newPhotos.length === 0) {
                    setCurrentFileIndex(fileIndex + 1)
                    setHasMore(fileIndex + 1 < fileOrderRef.current.length)
                } else {
                    setPhotos(prev => {
                        const existingLinks = new Set(prev.map(photo => photo.link))
                        const uniqueNewPhotos = newPhotos.filter(photo => !existingLinks.has(photo.link))
                        const shuffledNewPhotos = shufflePhotos(uniqueNewPhotos)

                        return prev.length === 0
                            ? shuffledNewPhotos
                            : [...prev, ...shuffledNewPhotos]
                    })
                    setCurrentFileIndex(fileIndex + 1)
                    setHasMore(fileIndex + 1 < fileOrderRef.current.length)
                }
            })
            .catch(error => {
                setHasMore(false)
                setIsLoading(false)
            })
            .finally(() => {
                inFlightFilesRef.current.delete(filePath)
                setIsLoading(false)
            })
    }

    // Infinite scroll observer
    useEffect(() => {
        if (!hasMore || isLoading || !sentinelRef.current) return

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    fetchPhotos(currentFileIndex)
                }
            },
            { threshold: 0.1 }
        )

        observer.observe(sentinelRef.current)
        return () => observer.disconnect()
    }, [currentFileIndex, hasMore, isLoading])

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTimeout(() => {
            setSelectedPhoto(null)
        }, 300)
    }

    const toggleFilter = (tag) => {
        setActiveFilters(prev => (
            prev.includes(tag)
                ? prev.filter(item => item !== tag)
                : [...prev, tag]
        ))
    }

    return (
        <React.Fragment>
            <div className={classes.filterControls}>
                <AnimatePresence initial={false} mode="popLayout">
                    {PHOTO_CATEGORY_ENTRIES.map(([label, category]) => {
                        const { tag, emoji } = category
                        const isActive = activeFilterSet.has(tag)

                        return isActive ? (
                            <motion.button
                                key={`${tag}-active`}
                                type="button"
                                className={`${classes.filterButton} ${classes.filterButtonActive}`}
                                onClick={() => toggleFilter(tag)}
                                variants={filterItemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                            >
                                <span className={classes.filterButtonEmoji}>{emoji}</span>
                                <span>{label}</span>
                                <span className={classes.filterButtonClose}>×</span>
                            </motion.button>
                        ) : (
                            <motion.button
                                key={`${tag}-inactive`}
                                type="button"
                                className={`${classes.filterButton} ${classes.filterButtonInactive}`}
                                onClick={() => toggleFilter(tag)}
                                variants={filterItemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                            >
                                <span className={classes.filterButtonPlus}>+</span>
                                <span className={classes.filterButtonEmoji}>{emoji}</span>
                                <span>{label}</span>
                            </motion.button>
                        )
                    })}
                </AnimatePresence>
            </div>
            <motion.div className={classes.photosGrid} variants={photoGridVariants} initial="hidden" animate="visible">
                <AnimatePresence initial={false} mode="popLayout">
                    {visiblePhotos.map((photo, index) => (
                        <motion.div 
                            key={photo.link}
                            className={classes.photoItem}
                            onClick={() => handlePhotoClick(photo)}
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    scale: 0.9,
                                },
                                visible: {
                                    opacity: 1,
                                    scale: 1,
                                    transition: {
                                        duration: 0.28,
                                        ease: [0.16, 1, 0.3, 1],
                                    },
                                },
                                hover: {
                                    scale: 1.05,
                                    transition: {
                                        duration: 0.1,
                                    },
                                },
                            }}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                transition: {
                                    duration: 0.18,
                                    ease: 'easeIn',
                                },
                            }}
                        >
                            <img src={photo.link} alt={photo.name} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
            <div>{isLoading && <Spinner/>}</div>
            <div ref={sentinelRef} className={classes.sentinel} />
            <PhotoModal
                photo={selectedPhoto}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </React.Fragment>
    )
}

export default Photos
