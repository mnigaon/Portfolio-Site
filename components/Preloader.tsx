"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderProps {
    onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const welcomeRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Final fade out of the entire preloader
                    gsap.to(containerRef.current, {
                        opacity: 0,
                        duration: 0.6,
                        ease: "power3.inOut",
                        onComplete: onComplete,
                    });
                },
            });

            // Welcome text reveal
            tl.fromTo(
                welcomeRef.current,
                { y: "100%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 1.0,
                    ease: "expo.out",
                    delay: 0.2
                }
            )
                .to(welcomeRef.current, {
                    opacity: 0,
                    y: -20,
                    filter: "blur(10px)",
                    duration: 0.8,
                    ease: "power3.inOut",
                    delay: 0.8
                });
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] text-white overflow-hidden"
        >
            <div className="relative flex flex-col items-center justify-center w-full h-full">
                {/* Welcome Message */}
                <div className="overflow-hidden py-4">
                    <div
                        ref={welcomeRef}
                        className="text-[clamp(32px,8vw,80px)] font-bold tracking-tight uppercase text-center px-6 leading-[1.1] opacity-0"
                        style={{ fontFamily: 'var(--font-syne), sans-serif', opacity: 0 }}
                    >
                        welcome!
                    </div>
                </div>
            </div>
        </div>
    );
};
