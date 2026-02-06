import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import classes from './photos.module.css'
import PhotoModal from './components/PhotoModal'
import { useAnimations } from '../../contexts/AnimationContext'

const Photos = () => {
    const [photos, setPhotos] = useState([])
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { photoItemVariants, getPhotoTransition } = useAnimations()

    useEffect(() => {
        fetch('/photos.json')
            .then(response => response.json())
            .then(data => {
                setPhotos(data.photos || [])
            })
            .catch(error => {
                console.error('Error loading photos:', error)
            })
    }, [])

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        // Delay clearing selected photo to allow exit animation
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
            <PhotoModal
                photo={selectedPhoto}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </React.Fragment>
    )
}

export default Photos
