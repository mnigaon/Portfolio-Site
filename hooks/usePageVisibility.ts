"use client";

import { useEffect, useState } from "react";

export function usePageVisibility(missYouMessage: string = "Miss you already... 👾") {
    useEffect(() => {
        let originalTitle = document.title;
        let isAway = false;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Determine the current title just in case it was updated by routing
                if (!isAway) {
                    originalTitle = document.title;
                }
                document.title = missYouMessage;
                isAway = true;
            } else {
                if (isAway) {
                    document.title = originalTitle;
                    isAway = false;
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [missYouMessage]);
}
