'use client'

import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { motion, Variants } from 'framer-motion'

interface ScrollRevealProps {
    children: React.ReactNode
    variants?: Variants
    direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
    delay?: number
    duration?: number
    className?: string
    threshold?: number
    once?: boolean
}

export default function ScrollReveal({
    children,
    variants,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className = '',
    once = true
}: ScrollRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { 
        once, 
        margin: "0px 0px -100px 0px" // Start animation slightly before element comes into view
    })

    // Default variants if none provided
    const defaultVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration,
                delay,
                ease: "easeOut"
            }
        }
    }

    // Apply direction-based transforms to default variants
    if (!variants) {
        switch (direction) {
            case 'up':
                defaultVariants.hidden = { ...defaultVariants.hidden, y: 75 }
                defaultVariants.visible = { ...defaultVariants.visible, y: 0 }
                break
            case 'down':
                defaultVariants.hidden = { ...defaultVariants.hidden, y: -75 }
                defaultVariants.visible = { ...defaultVariants.visible, y: 0 }
                break
            case 'left':
                defaultVariants.hidden = { ...defaultVariants.hidden, x: -75 }
                defaultVariants.visible = { ...defaultVariants.visible, x: 0 }
                break
            case 'right':
                defaultVariants.hidden = { ...defaultVariants.hidden, x: 75 }
                defaultVariants.visible = { ...defaultVariants.visible, x: 0 }
                break
            case 'scale':
                defaultVariants.hidden = { ...defaultVariants.hidden, scale: 0.8 }
                defaultVariants.visible = { ...defaultVariants.visible, scale: 1 }
                break
        }
    }

    const finalVariants = variants || defaultVariants

    return (
        <motion.div
            ref={ref}
            variants={finalVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Specialized scroll reveal components for common use cases
export function FadeInUp({ children, ...props }: Omit<ScrollRevealProps, 'direction'>) {
    return <ScrollReveal direction="up" {...props}>{children}</ScrollReveal>
}

export function FadeInDown({ children, ...props }: Omit<ScrollRevealProps, 'direction'>) {
    return <ScrollReveal direction="down" {...props}>{children}</ScrollReveal>
}

export function FadeInLeft({ children, ...props }: Omit<ScrollRevealProps, 'direction'>) {
    return <ScrollReveal direction="left" {...props}>{children}</ScrollReveal>
}

export function FadeInRight({ children, ...props }: Omit<ScrollRevealProps, 'direction'>) {
    return <ScrollReveal direction="right" {...props}>{children}</ScrollReveal>
}

export function ScaleIn({ children, ...props }: Omit<ScrollRevealProps, 'direction'>) {
    return <ScrollReveal direction="scale" {...props}>{children}</ScrollReveal>
}

// Stagger container for multiple animated children
export function StaggerContainer({ 
    children, 
    staggerDelay = 0.1,
    className = '',
    once = true
}: {
    children: React.ReactNode
    staggerDelay?: number
    className?: string
    threshold?: number
    once?: boolean
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { 
        once, 
        margin: "0px 0px -100px 0px"
    })

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.2
            }
        }
    }

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Stagger item for use within StaggerContainer
export function StaggerItem({ 
    children, 
    className = '',
    direction = 'up',
    delay = 0,
    duration = 0.6
}: {
    children: React.ReactNode
    className?: string
    direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
    delay?: number
    duration?: number
}) {
    const itemVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration,
                delay,
                ease: "easeOut"
            }
        }
    }

    // Apply direction-based transforms
    switch (direction) {
        case 'up':
            itemVariants.hidden = { ...itemVariants.hidden, y: 20 }
            itemVariants.visible = { ...itemVariants.visible, y: 0 }
            break
        case 'down':
            itemVariants.hidden = { ...itemVariants.hidden, y: -20 }
            itemVariants.visible = { ...itemVariants.visible, y: 0 }
            break
        case 'left':
            itemVariants.hidden = { ...itemVariants.hidden, x: -20 }
            itemVariants.visible = { ...itemVariants.visible, x: 0 }
            break
        case 'right':
            itemVariants.hidden = { ...itemVariants.hidden, x: 20 }
            itemVariants.visible = { ...itemVariants.visible, x: 0 }
            break
        case 'scale':
            itemVariants.hidden = { ...itemVariants.hidden, scale: 0.9 }
            itemVariants.visible = { ...itemVariants.visible, scale: 1 }
            break
    }

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    )
}
