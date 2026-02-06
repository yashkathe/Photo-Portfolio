import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimations } from '../../../contexts/AnimationContext';
import classes from './PhotoModal.module.css';

const PhotoModal = ({ photo, isOpen, onClose }) => {
    const {
        modalBackdropVariants,
        modalContentVariants,
        modalImageVariants,
        modalTextVariants,
    } = useAnimations();

    if (!photo) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={classes.backdrop}
                    variants={modalBackdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={onClose}
                >
                    <motion.div
                        className={classes.modalContent}
                        variants={modalContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.img
                            src={photo.link}
                            alt={photo.name}
                            className={classes.modalImage}
                            variants={modalImageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        />
                        <motion.div
                            className={classes.modalText}
                            variants={modalTextVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <h2 className={classes.modalTitle}>{photo.name}</h2>
                            <p className={classes.modalCaption}>{photo.caption}</p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PhotoModal;
