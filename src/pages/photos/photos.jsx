import React, { useState, useEffect } from "react"
import classes from './photos.module.css'
import PhotoModal from '../../ui-components/PhotoModal'

const Photos = () => {
    const [photos, setPhotos] = useState([])
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

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
                    <div 
                        key={index} 
                        className={classes.photoItem}
                        onClick={() => handlePhotoClick(photo)}
                    >
                        <img src={photo.link} alt={photo.name} />
                    </div>
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
