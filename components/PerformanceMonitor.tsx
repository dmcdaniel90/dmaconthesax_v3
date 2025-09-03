'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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

    const measurePerformance = () => {
        if (!window.performance || !window.performance.getEntriesByType) {
            console.warn('Performance API not supported')
            return
        }

        setIsMonitoring(true)

        // Measure Core Web Vitals
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
                    setMetrics(prev => ({ ...prev, fcp: Math.round(entry.startTime) }))
                }
                if (entry.entryType === 'largest-contentful-paint') {
                    setMetrics(prev => ({ ...prev, lcp: Math.round(entry.startTime) }))
                }
                if (entry.entryType === 'first-input') {
                    setMetrics(prev => ({ ...prev, fid: Math.round(entry.processingStart - entry.startTime) }))
                }
                if (entry.entryType === 'layout-shift') {
                    const clsEntry = entry as any
                    setMetrics(prev => ({ ...prev, cls: Math.round(clsEntry.value * 1000) / 1000 }))
                }
            }
        })

        try {
            observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] })
        } catch (e) {
            console.warn('Performance observer not supported:', e)
        }

        // Measure TTFB
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        if (navigationEntry) {
            setMetrics(prev => ({ 
                ...prev, 
                ttfb: Math.round(navigationEntry.responseStart - navigationEntry.requestStart) 
            }))
        }

        // Measure DOM and Window load times
        if (document.readyState === 'complete') {
            const loadTime = performance.now()
            setMetrics(prev => ({ 
                ...prev, 
                domLoad: Math.round(loadTime),
                windowLoad: Math.round(loadTime)
            }))
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                setMetrics(prev => ({ 
                    ...prev, 
                    domLoad: Math.round(performance.now()) 
                }))
            })

            window.addEventListener('load', () => {
                setMetrics(prev => ({ 
                    ...prev, 
                    windowLoad: Math.round(performance.now()) 
                }))
            })
        }

        // Stop monitoring after 5 seconds
        setTimeout(() => {
            setIsMonitoring(false)
            observer.disconnect()
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
                                className="h-6 px-2 text-xs"
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
                                <span className="text-gray-300">First Input Delay:</span>
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

                        <div className="pt-2 border-t border-gray-700/50">
                            <Button
                                onClick={measurePerformance}
                                disabled={isMonitoring}
                                className="w-full bg-[#02ACAC] hover:bg-[#02ACAC]/90 text-white"
                            >
                                {isMonitoring ? 'Measuring...' : 'Measure Performance'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    )
}
