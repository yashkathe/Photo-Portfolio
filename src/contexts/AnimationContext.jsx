import React, { createContext, useContext } from 'react';

const AnimationContext = createContext();

export const useAnimations = () => {
    const context = useContext(AnimationContext);
    if (!context) {
        throw new Error('useAnimations must be used within AnimationProvider');
    }
    return context;
};

export const AnimationProvider = ({ children }) => {
    
    const modalBackdropVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: 'easeIn',
            },
        },
    };

    const modalContentVariants = {
        hidden: {
            scale: 0.8,
            opacity: 0,
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1], 
            },
        },
        exit: {
            scale: 0.8,
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: 'easeIn',
            },
        },
    };

    const modalImageVariants = {
        hidden: {
            scale: 0.9,
            opacity: 0,
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
            },
        },
        exit: {
            scale: 0.9,
            opacity: 0,
            transition: {
                duration: 0.25,
                ease: 'easeIn',
            },
        },
    };

    const modalTextVariants = {
        hidden: {
            y: 20,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
            },
        },
        exit: {
            y: 20,
            opacity: 0,
            transition: {
                duration: 0.25,
                ease: 'easeIn',
            },
        },
    };

    const headerVariants = {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
        hidden: {
            y: -100,
            opacity: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    const photoItemVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            scale: 1,
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.1,
            },
        },
    };

    const getPhotoTransition = (index) => ({
        delay: Math.random(),
    });

    const value = {
        modalBackdropVariants,
        modalContentVariants,
        modalImageVariants,
        modalTextVariants,
        headerVariants,
        photoItemVariants,
        getPhotoTransition,
    };

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
};
