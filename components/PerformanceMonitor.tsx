'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { onFCP, onLCP, onINP, onCLS, onTTFB, type Metric } from 'web-vitals'

interface PerformanceMetrics {
    fcp: number | null
    lcp: number | null
    fid: number | null
    cls: number | null
    ttfb: number | null
    domLoad: number | null
    windowLoad: number | null
}

export default function PerformanceMonitor() {
    const [isVisible, setIsVisible] = useState(false)
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
        fcp: null,
        lcp: null,
        fid: null,
        cls: null,
        ttfb: null,
        domLoad: null,
        windowLoad: null
    })
    const [isMonitoring, setIsMonitoring] = useState(false)

    // Auto-start monitoring on component mount using web-vitals library
    useEffect(() => {
        // Only run in development mode
        if (process.env.NODE_ENV === 'production') {
            return
        }
        if (typeof window !== 'undefined') {
            // Handle metric updates from web-vitals
            const handleMetric = (metric: Metric) => {
                console.log(`Web Vitals: ${metric.name} = ${metric.value}ms`)
                setMetrics(prev => {
                    const newMetrics = { ...prev }
                    
                    switch (metric.name) {
                        case 'FCP':
                            newMetrics.fcp = Math.round(metric.value)
                            break
                        case 'LCP':
                            newMetrics.lcp = Math.round(metric.value)
                            break
                        case 'INP':
                            newMetrics.fid = Math.round(metric.value)
                            break
                        case 'CLS':
                            newMetrics.cls = Math.round(metric.value * 1000) / 1000
                            break
                        case 'TTFB':
                            newMetrics.ttfb = Math.round(metric.value)
                            break
                    }
                    
                    return newMetrics
                })
            }

            // Set up web-vitals listeners with better configuration
            onFCP(handleMetric)
            onLCP(handleMetric)
            
            // INP with more aggressive reporting
            onINP(handleMetric, { reportAllChanges: true })
            
            // CLS with more aggressive reporting
            onCLS(handleMetric, { reportAllChanges: true })
            
            onTTFB(handleMetric)

            // Cleanup function (web-vitals doesn't provide cleanup, but we can track state)
            return () => {
                // Web-vitals listeners are automatically cleaned up
            }
        }
    }, [])

    // Only render in development mode
    if (process.env.NODE_ENV === 'production') {
        return null
    }

    const measurePerformance = () => {
        if (typeof window === 'undefined') {
            console.warn('Performance measurement not available in SSR')
            return
        }

        setIsMonitoring(true)

        // Web-vitals automatically handles measurement, but we can trigger a refresh
        // by re-setting up the listeners to catch any metrics that might have been missed
        const handleMetric = (metric: Metric) => {
            setMetrics(prev => {
                const newMetrics = { ...prev }
                
                switch (metric.name) {
                    case 'FCP':
                        newMetrics.fcp = Math.round(metric.value)
                        break
                    case 'LCP':
                        newMetrics.lcp = Math.round(metric.value)
                        break
                    case 'INP':
                        newMetrics.fid = Math.round(metric.value)
                        break
                    case 'CLS':
                        newMetrics.cls = Math.round(metric.value * 1000) / 1000
                        break
                    case 'TTFB':
                        newMetrics.ttfb = Math.round(metric.value)
                        break
                }
                
                return newMetrics
            })
        }

        // Re-setup listeners to catch any missed metrics with better configuration
        onFCP(handleMetric)
        onLCP(handleMetric)
        
        // INP with more aggressive reporting
        onINP(handleMetric, { reportAllChanges: true })
        
        // CLS with more aggressive reporting
        onCLS(handleMetric, { reportAllChanges: true })
        
        onTTFB(handleMetric)

        // Also measure DOM and Window load times using navigation timing
        try {
            const navigationEntries = performance.getEntriesByType('navigation')
            if (navigationEntries.length > 0) {
                const navigationEntry = navigationEntries[0] as PerformanceNavigationTiming
                
                if (document.readyState === 'complete') {
                    setMetrics(prev => ({ 
                        ...prev, 
                        domLoad: Math.round(navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart),
                        windowLoad: Math.round(navigationEntry.loadEventEnd - navigationEntry.fetchStart)
                    }))
                } else {
                    // Set up listeners for when page finishes loading
                    const handleDOMContentLoaded = () => {
                        setMetrics(prev => ({ 
                            ...prev, 
                            domLoad: Math.round(performance.now()) 
                        }))
                    }

                    const handleWindowLoad = () => {
                        setMetrics(prev => ({ 
                            ...prev, 
                            windowLoad: Math.round(performance.now()) 
                        }))
                    }

                    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded, { once: true })
                    window.addEventListener('load', handleWindowLoad, { once: true })
                }
            }
        } catch (error) {
            console.warn('Error measuring load times:', error)
        }

        // Stop monitoring after 5 seconds (shorter since web-vitals is more efficient)
        setTimeout(() => {
            setIsMonitoring(false)
        }, 5000)
    }

    const getPerformanceGrade = (metric: keyof PerformanceMetrics): string => {
        const value = metrics[metric]
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
        setMetrics({
            fcp: null,
            lcp: null,
            fid: null,
            cls: null,
            ttfb: null,
            domLoad: null,
            windowLoad: null
        })
        setIsMonitoring(false)
    }

    return (
        <>
            {/* Floating button */}
            <Button
                onClick={() => setIsVisible(!isVisible)}
                className="fixed bottom-4 right-4 z-50 bg-[#02ACAC] hover:bg-[#02ACAC]/90 text-white rounded-full w-12 h-12 p-0 shadow-lg"
                aria-label="Toggle performance monitor"
            >
                📊
            </Button>

            {/* Performance panel */}
            {isVisible && (
                <Card className="fixed bottom-20 right-4 z-50 w-80 bg-gray-900/95 border-gray-700/50 shadow-2xl">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-white flex items-center justify-between">
                            Performance Monitor
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
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-300">First Contentful Paint:</span>
                                <span className="text-white">
                                    {metrics.fcp ? `${metrics.fcp}ms` : 'N/A'}
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
                                    {metrics.lcp ? `${metrics.lcp}ms` : 'N/A'}
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
                                    {metrics.fid ? `${metrics.fid}ms` : 'N/A'}
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
                                    {metrics.cls ? metrics.cls : 'N/A'}
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
                                    {metrics.ttfb ? `${metrics.ttfb}ms` : 'N/A'}
                                </span>
                            </div>
                            <div className="text-xs text-gray-400">
                                {getPerformanceGrade('ttfb')}
                            </div>
                        </div>

                        <div className="pt-2 border-t border-gray-700/50 space-y-2">
                            <Button
                                onClick={measurePerformance}
                                disabled={isMonitoring}
                                className="w-full bg-[#02ACAC] hover:bg-[#02ACAC]/90 text-white"
                            >
                                {isMonitoring ? 'Measuring...' : 'Measure Performance'}
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
