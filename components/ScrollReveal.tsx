'use client'

import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
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
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const isInView = useInView(ref, { 
        once, 
        margin: "0px 0px -100px 0px" // Start animation slightly before element comes into view
    })

    // Check for reduced motion preference
    useEffect(() => {
        setIsClient(true);
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches)
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    // Default variants if none provided
    const defaultVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: !isClient || prefersReducedMotion ? 0 : duration,
                delay: !isClient || prefersReducedMotion ? 0 : delay,
                ease: "easeOut"
            }
        }
    }

    // Apply direction-based transforms to default variants (only if motion is not reduced)
    // CLS Optimized: Reduced movement values to prevent layout shifts
    if (!variants && isClient && !prefersReducedMotion) {
        switch (direction) {
            case 'up':
                defaultVariants.hidden = { ...defaultVariants.hidden, y: 30 }
                defaultVariants.visible = { ...defaultVariants.visible, y: 0 }
                break
            case 'down':
                defaultVariants.hidden = { ...defaultVariants.hidden, y: -30 }
                defaultVariants.visible = { ...defaultVariants.visible, y: 0 }
                break
            case 'left':
                defaultVariants.hidden = { ...defaultVariants.hidden, x: -30 }
                defaultVariants.visible = { ...defaultVariants.visible, x: 0 }
                break
            case 'right':
                defaultVariants.hidden = { ...defaultVariants.hidden, x: 30 }
                defaultVariants.visible = { ...defaultVariants.visible, x: 0 }
                break
            case 'scale':
                defaultVariants.hidden = { ...defaultVariants.hidden, scale: 0.95 }
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
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const isInView = useInView(ref, { 
        once, 
        margin: "0px 0px -100px 0px"
    })

    // Check for reduced motion preference
    useEffect(() => {
        setIsClient(true);
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches)
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: !isClient || prefersReducedMotion ? 0 : staggerDelay,
                delayChildren: !isClient || prefersReducedMotion ? 0 : 0.2
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
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
    const [isClient, setIsClient] = useState(false)

    // Check for reduced motion preference
    useEffect(() => {
        setIsClient(true);
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches)
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const itemVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: !isClient || prefersReducedMotion ? 0 : duration,
                delay: !isClient || prefersReducedMotion ? 0 : delay,
                ease: "easeOut"
            }
        }
    }

    // Apply direction-based transforms (only if motion is not reduced)
    if (isClient && !prefersReducedMotion) {
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
    }

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    )
}
