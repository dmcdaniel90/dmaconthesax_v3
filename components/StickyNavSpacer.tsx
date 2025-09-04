'use client';

import { useHeaderContext } from "@/app/contexts/HeaderContext";

export default function StickyNavSpacer() {
    const HeaderContext = useHeaderContext();
    
    // Only add spacer when sticky nav is active (non-home pages on desktop)
    if (HeaderContext.state.activeLink === "home") {
        return null;
    }
    
    return (
        <div className="hidden md:block h-16 lg:h-20" />
    );
}
