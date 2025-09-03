import { Variants } from 'framer-motion'

// Common animation variants for reuse across components
export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 60 }
}

export const fadeInDown: Variants = {
    initial: { opacity: 0, y: -60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 }
}

export const fadeInLeft: Variants = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 }
}

export const fadeInRight: Variants = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 60 }
}

export const scaleIn: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
}

export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
}

export const staggerItem: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
}

// Scroll-triggered animations
export const scrollReveal: Variants = {
    hidden: { opacity: 0, y: 75 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.6, 0.05, -0.01, 0.9]
        }
    }
}

export const scrollRevealLeft: Variants = {
    hidden: { opacity: 0, x: -75 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.6, 0.05, -0.01, 0.9]
        }
    }
}

export const scrollRevealRight: Variants = {
    hidden: { opacity: 0, x: 75 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.6, 0.05, -0.01, 0.9]
        }
    }
}

export const scrollRevealScale: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.6, 0.05, -0.01, 0.9]
        }
    }
}

// Parallax scroll effects
export const parallaxUp: Variants = {
    hidden: { y: 0 },
    visible: {
        y: -50,
        transition: {
            duration: 1,
            ease: "easeOut"
        }
    }
}

export const parallaxDown: Variants = {
    hidden: { y: 0 },
    visible: {
        y: 50,
        transition: {
            duration: 1,
            ease: "easeOut"
        }
    }
}

// Hover animations
export const hoverScale: Variants = {
    initial: { scale: 1 },
    hover: { 
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" }
    }
}

export const hoverLift: Variants = {
    initial: { y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
    hover: { 
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.3, ease: "easeOut" }
    }
}

export const hoverGlow: Variants = {
    initial: { boxShadow: "0 0 0 0 rgba(2, 172, 172, 0)" },
    hover: { 
        boxShadow: "0 0 20px 10px rgba(2, 172, 172, 0.3)",
        transition: { duration: 0.3, ease: "easeOut" }
    }
}

// Text animations
export const textReveal: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.6, 0.05, -0.01, 0.9]
        }
    }
}

export const textStagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

export const letterReveal: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.6, 0.05, -0.01, 0.9]
        }
    }
}

// Page transitions
export const pageTransition: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
}

export const pageTransitionUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
}

// Loading animations
export const loadingSpinner: Variants = {
    animate: {
        rotate: 360,
        transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear"
        }
    }
}

export const loadingPulse: Variants = {
    animate: {
        scale: [1, 1.1, 1],
        opacity: [1, 0.7, 1],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
}

// Utility function to create custom scroll-triggered animations
export const createScrollAnimation = (
    direction: 'up' | 'down' | 'left' | 'right' | 'scale' = 'up',
    delay: number = 0,
    duration: number = 0.6
) => {
    const baseVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration,
                delay,
                ease: [0.6, 0.05, -0.01, 0.9]
            }
        }
    }

    switch (direction) {
        case 'up':
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, y: 75 },
                visible: { ...baseVariants.visible, y: 0 }
            }
        case 'down':
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, y: -75 },
                visible: { ...baseVariants.visible, y: 0 }
            }
        case 'left':
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, x: -75 },
                visible: { ...baseVariants.visible, x: 0 }
            }
        case 'right':
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, x: 75 },
                visible: { ...baseVariants.visible, x: 0 }
            }
        case 'scale':
            return {
                ...baseVariants,
                hidden: { ...baseVariants.hidden, scale: 0.8 },
                visible: { ...baseVariants.visible, scale: 1 }
            }
        default:
            return baseVariants
    }
}
