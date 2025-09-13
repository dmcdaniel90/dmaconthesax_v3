'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { onFCP, onLCP, onINP, onCLS, onTTFB, type Metric } from 'web-vitals'
import { measurePerformance as measureCustomPerformance, formatMetrics, PerformanceMetrics as CustomPerformanceMetrics } from '@/lib/performance-test'

interface WebVitalsMetrics {
    fcp: number | null
    lcp: number | null
    fid: number | null
    cls: number | null
    ttfb: number | null
    domLoad: number | null
    windowLoad: number | null
}

interface PerformanceMonitorState {
    webVitals: WebVitalsMetrics
    customMetrics: CustomPerformanceMetrics | null
    isMonitoring: boolean
    isVisible: boolean
    isDragging: boolean
    position: { x: number; y: number }
}

export default function PerformanceMonitor() {
    const [state, setState] = useState<PerformanceMonitorState>({
        webVitals: {
            fcp: null,
            lcp: null,
            fid: null,
            cls: null,
            ttfb: null,
            domLoad: null,
            windowLoad: null
        },
        customMetrics: null,
        isMonitoring: false,
        isVisible: false,
        isDragging: false,
        position: { x: 16, y: 80 } // Default position (bottom-20 right-4)
    })
    
    const dragRef = useRef<HTMLDivElement>(null)
    const dragStartRef = useRef({ x: 0, y: 0 })

    // Auto-start monitoring on component mount
    useEffect(() => {
        // Only run in development mode
        if (process.env.NODE_ENV === 'production') {
            return
        }
        if (typeof window !== 'undefined') {
            // Handle metric updates from web-vitals
            const handleMetric = (metric: Metric) => {
                console.log(`Web Vitals: ${metric.name} = ${metric.value}ms`)
                setState(prev => ({
                    ...prev,
                    webVitals: {
                        ...prev.webVitals,
                        ...(metric.name === 'FCP' && { fcp: Math.round(metric.value) }),
                        ...(metric.name === 'LCP' && { lcp: Math.round(metric.value) }),
                        ...(metric.name === 'INP' && { fid: Math.round(metric.value) }),
                        ...(metric.name === 'CLS' && { cls: Math.round(metric.value * 1000) / 1000 }),
                        ...(metric.name === 'TTFB' && { ttfb: Math.round(metric.value) })
                    }
                }))
            }

            // Set up web-vitals listeners with better configuration
            onFCP(handleMetric)
            onLCP(handleMetric)
            
            // INP with more aggressive reporting
            onINP(handleMetric, { reportAllChanges: true })
            
            // CLS with more aggressive reporting
            onCLS(handleMetric, { reportAllChanges: true })
            
            onTTFB(handleMetric)

            // Load custom performance metrics after page load
            const timer = setTimeout(() => {
                const customMetrics = measureCustomPerformance()
                setState(prev => ({ ...prev, customMetrics }))
            }, 2000)

            return () => {
                clearTimeout(timer)
                // Web-vitals listeners are automatically cleaned up
            }
        }
    }, [])

    // Drag functionality
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!state.isDragging) return
            
            const newX = e.clientX - dragStartRef.current.x
            const newY = e.clientY - dragStartRef.current.y
            
            // Constrain to viewport bounds
            const maxX = window.innerWidth - 320 // Card width is 320px (w-80)
            const maxY = window.innerHeight - 500 // Increased height for expanded content
            
            setState(prev => ({
                ...prev,
                position: {
                    x: Math.max(0, Math.min(newX, maxX)),
                    y: Math.max(0, Math.min(newY, maxY))
                }
            }))
        }

        const handleMouseUp = () => {
            setState(prev => ({ ...prev, isDragging: false }))
        }

        if (state.isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [state.isDragging])

    const handleMouseDown = (e: React.MouseEvent) => {
        if (dragRef.current) {
            const rect = dragRef.current.getBoundingClientRect()
            dragStartRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
            setState(prev => ({ ...prev, isDragging: true }))
        }
    }

    // Only render in development mode
    if (process.env.NODE_ENV === 'production') {
        return null
    }

    const measurePerformance = () => {
        if (typeof window === 'undefined') {
            console.warn('Performance measurement not available in SSR')
            return
        }

        setState(prev => ({ ...prev, isMonitoring: true }))

        // Measure custom performance metrics
        const customMetrics = measureCustomPerformance()
        setState(prev => ({ ...prev, customMetrics }))

        // Re-measure web-vitals metrics
        const handleMetric = (metric: Metric) => {
            setState(prev => ({
                ...prev,
                webVitals: {
                    ...prev.webVitals,
                    ...(metric.name === 'FCP' && { fcp: Math.round(metric.value) }),
                    ...(metric.name === 'LCP' && { lcp: Math.round(metric.value) }),
                    ...(metric.name === 'INP' && { fid: Math.round(metric.value) }),
                    ...(metric.name === 'CLS' && { cls: Math.round(metric.value * 1000) / 1000 }),
                    ...(metric.name === 'TTFB' && { ttfb: Math.round(metric.value) })
                }
            }))
        }

        // Re-setup listeners to catch any missed metrics
        onFCP(handleMetric)
        onLCP(handleMetric)
        onINP(handleMetric, { reportAllChanges: true })
        onCLS(handleMetric, { reportAllChanges: true })
        onTTFB(handleMetric)

        // Also measure DOM and Window load times using navigation timing
        try {
            const navigationEntries = performance.getEntriesByType('navigation')
            if (navigationEntries.length > 0) {
                const navigationEntry = navigationEntries[0] as PerformanceNavigationTiming
                
                if (document.readyState === 'complete') {
                    setState(prev => ({ 
                        ...prev, 
                        webVitals: {
                            ...prev.webVitals,
                            domLoad: Math.round(navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart),
                            windowLoad: Math.round(navigationEntry.loadEventEnd - navigationEntry.fetchStart)
                        }
                    }))
                } else {
                    // Set up listeners for when page finishes loading
                    const handleDOMContentLoaded = () => {
                        setState(prev => ({ 
                            ...prev, 
                            webVitals: {
                                ...prev.webVitals,
                                domLoad: Math.round(performance.now()) 
                            }
                        }))
                    }

                    const handleWindowLoad = () => {
                        setState(prev => ({ 
                            ...prev, 
                            webVitals: {
                                ...prev.webVitals,
                                windowLoad: Math.round(performance.now()) 
                            }
                        }))
                    }

                    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded, { once: true })
                    window.addEventListener('load', handleWindowLoad, { once: true })
                }
            }
        } catch (error) {
            console.warn('Error measuring load times:', error)
        }

        // Stop monitoring after 5 seconds
        setTimeout(() => {
            setState(prev => ({ ...prev, isMonitoring: false }))
        }, 5000)
    }

    const getPerformanceGrade = (metric: keyof WebVitalsMetrics): string => {
        const value = state.webVitals[metric]
        if (value === null) return 'N/A'

        switch (metric) {
            case 'fcp':
                return value <= 1800 ? '🟢 Good' : value <= 3000 ? '🟡 Needs Improvement' : '🔴 Poor'
            case 'lcp':
                return value <= 2500 ? '🟢 Good' : value <= 4000 ? '🟡 Needs Improvement' : '🔴 Poor'
            case 'fid':
                return value <= 100 ? '🟢 Good' : value <= 300 ? '🟡 Needs Improvement' : '🔴 Poor'
            case 'cls':
                return value <= 0.1 ? '🟢 Good' : value <= 0.25 ? '🟡 Needs Improvement' : '🔴 Poor'
            case 'ttfb':
                return value <= 800 ? '🟢 Good' : value <= 1800 ? '🟡 Needs Improvement' : '🔴 Poor'
            default:
                return 'N/A'
        }
    }

    const resetMetrics = () => {
        setState(prev => ({
            ...prev,
            webVitals: {
                fcp: null,
                lcp: null,
                fid: null,
                cls: null,
                ttfb: null,
                domLoad: null,
                windowLoad: null
            },
            customMetrics: null,
            isMonitoring: false
        }))
    }

    return (
        <>
            {/* Floating button */}
            <Button
                onClick={() => setState(prev => ({ ...prev, isVisible: !prev.isVisible }))}
                className="fixed bottom-4 right-4 z-50 bg-[#02ACAC] hover:bg-[#02ACAC]/90 text-white rounded-full w-12 h-12 p-0 shadow-lg"
                aria-label="Toggle performance monitor"
            >
                📊
            </Button>

            {/* Performance panel */}
            {state.isVisible && (
                <Card 
                    ref={dragRef}
                    className="fixed z-50 w-80 bg-gray-900/95 border-gray-700/50 shadow-2xl select-none"
                    style={{
                        left: `${state.position.x}px`,
                        top: `${state.position.y}px`,
                        cursor: state.isDragging ? 'grabbing' : 'grab'
                    }}
                >
                    <CardHeader 
                        className="pb-3 cursor-grab active:cursor-grabbing"
                        onMouseDown={handleMouseDown}
                    >
                        <CardTitle className="text-lg text-white flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                📊 Performance Monitor
                                <span className="text-xs text-gray-400">(drag to move)</span>
                            </span>
                            <Button
                                onClick={resetMetrics}
                                size="sm"
                                variant="outline"
                                className="h-6 px-2 text-xs text-black"
                            >
                                Reset
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {/* Web Vitals Section */}
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-[#02ACAC] border-b border-gray-700/50 pb-1">
                                Web Vitals
                            </h4>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">First Contentful Paint:</span>
                                    <span className="text-white">
                                        {state.webVitals.fcp ? `${state.webVitals.fcp}ms` : 'N/A'}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {getPerformanceGrade('fcp')}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">Largest Contentful Paint:</span>
                                    <span className="text-white">
                                        {state.webVitals.lcp ? `${state.webVitals.lcp}ms` : 'N/A'}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {getPerformanceGrade('lcp')}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">Interaction to Next Paint:</span>
                                    <span className="text-white">
                                        {state.webVitals.fid ? `${state.webVitals.fid}ms` : 'N/A'}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {getPerformanceGrade('fid')}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">Cumulative Layout Shift:</span>
                                    <span className="text-white">
                                        {state.webVitals.cls ? state.webVitals.cls : 'N/A'}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {getPerformanceGrade('cls')}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">Time to First Byte:</span>
                                    <span className="text-white">
                                        {state.webVitals.ttfb ? `${state.webVitals.ttfb}ms` : 'N/A'}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {getPerformanceGrade('ttfb')}
                                </div>
                            </div>
                        </div>

                        {/* Custom Performance Metrics Section */}
                        {state.customMetrics && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-[#02ACAC] border-b border-gray-700/50 pb-1">
                                    Custom Metrics
                                </h4>
                                <div className="text-xs space-y-1">
                                    {Object.entries(formatMetrics(state.customMetrics)).map(([key, value]) => (
                                        <div key={key} className="flex justify-between">
                                            <span className="text-gray-300">{key}:</span>
                                            <span className="font-mono text-white">{value}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-xs text-green-400 mt-2">
                                    Cloudinary Video: Active ✅
                                </div>
                            </div>
                        )}

                        <div className="pt-2 border-t border-gray-700/50 space-y-2">
                            <Button
                                onClick={measurePerformance}
                                disabled={state.isMonitoring}
                                className="w-full bg-[#02ACAC] hover:bg-[#02ACAC]/90 text-white"
                            >
                                {state.isMonitoring ? 'Measuring...' : 'Measure Performance'}
                            </Button>
                            
                            <Button
                                onClick={() => {
                                    // Trigger a test interaction to help capture INP
                                    const testElement = document.createElement('div')
                                    testElement.style.position = 'fixed'
                                    testElement.style.top = '-100px'
                                    testElement.style.left = '-100px'
                                    testElement.style.width = '1px'
                                    testElement.style.height = '1px'
                                    document.body.appendChild(testElement)
                                    
                                    // Simulate a click interaction
                                    testElement.click()
                                    
                                    // Remove the test element
                                    setTimeout(() => {
                                        document.body.removeChild(testElement)
                                    }, 100)
                                }}
                                variant="outline"
                                className="w-full text-xs"
                            >
                                Test Interaction (for INP)
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    )
}
