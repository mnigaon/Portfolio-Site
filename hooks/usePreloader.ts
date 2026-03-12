"use client";

import { useState, useEffect } from "react";

export const usePreloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");
        
        if (hasSeenPreloader) {
            setIsLoading(false);
        }
    }, []);

    const finishLoading = () => {
        sessionStorage.setItem("hasSeenPreloader", "true");
        setIsLoading(false);
    };

    return { isLoading, finishLoading };
};
