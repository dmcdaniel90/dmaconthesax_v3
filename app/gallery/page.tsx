'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Gallery() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to photos as the default gallery view
        router.replace('/gallery/photos');
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#02ACAC]"></div>
        </div>
    );
}
