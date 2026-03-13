"use client";

import { useState, useEffect } from "react";

export function useActiveSection() {
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "-20% 0px -35% 0px",
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, options);

        const observeSections = () => {
            const sections = document.querySelectorAll("section[id]");
            sections.forEach((section) => observer.observe(section));
        };

        // Initial observation
        observeSections();

        // Set up MutationObserver to re-observe when dynamic components are loaded
        const mutationObserver = new MutationObserver(() => {
            observeSections();
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    return activeSection;
}
