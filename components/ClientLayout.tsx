"use client";

import { usePreloader } from "@/hooks/usePreloader";
import { usePageVisibility } from "@/hooks/usePageVisibility";
import { Preloader } from "@/components/Preloader";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { isLoading, finishLoading } = usePreloader();
    const [contentVisible, setContentVisible] = useState(false);
    
    usePageVisibility();

    useEffect(() => {
        if (!isLoading) {
            // Delay slightly to ensure smooth transition
            const timer = setTimeout(() => {
                setContentVisible(true);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {isLoading && <Preloader onComplete={finishLoading} />}
            <div 
                className={`transition-opacity duration-1000 ease-in-out ${contentVisible ? "opacity-100" : "opacity-0"}`}
            >
                {children}
            </div>
        </ThemeProvider>
    );
}
