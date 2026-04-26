import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import classes from './photos.module.css'
import PhotoModal from './components/PhotoModal'
import Spinner from "../ui-components/spinner"
import { useAnimations } from '../contexts/AnimationContext'

const Photos = () => {
    const [photos, setPhotos] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { photoItemVariants, getPhotoTransition } = useAnimations()
    const sentinelRef = useRef(null)
    const initializedRef = useRef(false)
    const inFlightPagesRef = useRef(new Set())

    // Load initial photos
    useEffect(() => {
        if (initializedRef.current) return
        initializedRef.current = true
        fetchPhotos(1)
    }, [])

    const fetchPhotos = (pageNum) => {
        if (inFlightPagesRef.current.has(pageNum)) return
        inFlightPagesRef.current.add(pageNum)

        setIsLoading(true)
        fetch(`/photos-${pageNum}.json`)
            .then(response => {
                if (!response.ok) throw new Error('No more pages')
                return response.json()
            })
            .then(data => {
                const newPhotos = data.photos || []
                if (newPhotos.length === 0) {
                    setHasMore(false)
                } else {
                    setPhotos(prev => {
                        const existingLinks = new Set(prev.map(photo => photo.link))
                        const uniqueNewPhotos = newPhotos.filter(photo => !existingLinks.has(photo.link))
                        return [...prev, ...uniqueNewPhotos]
                    })
                    setCurrentPage(pageNum + 1)
                }
            })
            .catch(error => {
                setHasMore(false)
                setIsLoading(false)
            })
            .finally(() => {
                inFlightPagesRef.current.delete(pageNum)
                setIsLoading(false)
            })
    }

    // Infinite scroll observer
    useEffect(() => {
        if (!hasMore || isLoading || !sentinelRef.current) return

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    fetchPhotos(currentPage)
                }
            },
            { threshold: 0.1 }
        )

        observer.observe(sentinelRef.current)
        return () => observer.disconnect()
    }, [currentPage, hasMore, isLoading])

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
                        key={index} 
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
