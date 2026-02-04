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
    // Modal animations
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
                ease: [0.16, 1, 0.3, 1], // Custom easing for smooth animation
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
                delay: 0.1,
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

    const value = {
        modalBackdropVariants,
        modalContentVariants,
        modalImageVariants,
        modalTextVariants,
    };

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
};
