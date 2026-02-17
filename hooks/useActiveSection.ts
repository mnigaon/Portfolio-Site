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

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return activeSection;
}
