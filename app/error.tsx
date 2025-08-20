'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='h-[200px] flex flex-col justify-center items-center'>
            <h2 className='mb-6'>Something went wrong!</h2>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className='cursor-pointer hover:bg-gray-300 hover:text-gray-900'
            >
                Try again
            </Button>
        </div>
    )
}