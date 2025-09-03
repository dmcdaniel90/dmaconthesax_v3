import { cn } from "@/lib/utils"

interface LoadingProps {
    variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton'
    size?: 'sm' | 'md' | 'lg' | 'xl'
    className?: string
    text?: string
}

export function Loading({ 
    variant = 'spinner', 
    size = 'md', 
    className,
    text 
}: LoadingProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12'
    }

    const renderSpinner = () => (
        <div className={cn(
            "border-2 border-gray-300 border-t-current rounded-full animate-spin",
            sizeClasses[size],
            className
        )} />
    )

    const renderDots = () => (
        <div className={cn("flex space-x-1", className)}>
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className={cn(
                        "bg-current rounded-full animate-pulse",
                        size === 'sm' ? 'w-1.5 h-1.5' :
                        size === 'md' ? 'w-2 h-2' :
                        size === 'lg' ? 'w-2.5 h-2.5' :
                        'w-3 h-3'
                    )}
                    style={{
                        animationDelay: `${i * 0.2}s`
                    }}
                />
            ))}
        </div>
    )

    const renderPulse = () => (
        <div className={cn(
            "bg-current rounded-full animate-pulse",
            sizeClasses[size],
            className
        )} />
    )

    const renderSkeleton = () => (
        <div className={cn(
            "animate-pulse bg-gray-700 rounded",
            size === 'sm' ? 'h-4' :
            size === 'md' ? 'h-6' :
            size === 'lg' ? 'h-8' :
            'h-12',
            className
        )} />
    )

    const renderContent = () => {
        switch (variant) {
            case 'dots':
                return renderDots()
            case 'pulse':
                return renderPulse()
            case 'skeleton':
                return renderSkeleton()
            default:
                return renderSpinner()
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            {renderContent()}
            {text && (
                <span className="text-sm text-gray-400 animate-pulse">
                    {text}
                </span>
            )}
        </div>
    )
}

// Skeleton loader for content areas
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-gray-700", className)}
            {...props}
        />
    )
}

// Loading overlay for full-screen loading states
export function LoadingOverlay({ 
    children, 
    isLoading, 
    text = "Loading...",
    className 
}: { 
    children: React.ReactNode
    isLoading: boolean
    text?: string
    className?: string
}) {
    if (!isLoading) return <>{children}</>

    return (
        <div className={cn("relative", className)}>
            {children}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
                <Loading variant="spinner" size="lg" text={text} />
            </div>
        </div>
    )
}
