import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import classes from './photos.module.css'
import PhotoModal from './components/PhotoModal'
import Spinner from "../ui-components/spinner"
import { useAnimations } from '../contexts/AnimationContext'

const PHOTO_FILES = ['/photos-1.json', '/photos-2.json', '/photos-3.json']

const shufflePhotos = (items) => {
    const shuffled = [...items]

    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
}

const Photos = () => {
    const [photos, setPhotos] = useState([])
    const [currentFileIndex, setCurrentFileIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { photoItemVariants, getPhotoTransition } = useAnimations()
    const sentinelRef = useRef(null)
    const initializedRef = useRef(false)
    const inFlightFilesRef = useRef(new Set())
    const fileOrderRef = useRef(shufflePhotos(PHOTO_FILES))

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

    return (
        <React.Fragment>
            <div className={classes.photosGrid}>
                {photos.map((photo, index) => (
                    <motion.div 
                        key={photo.link} 
                        className={classes.photoItem}
                        onClick={() => handlePhotoClick(photo)}
                        variants={photoItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true, margin: "-50px" }}
                        transition={getPhotoTransition(index)}
                    >
                        <img src={photo.link} alt={photo.name} />
                    </motion.div>
                ))}
            </div>
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
