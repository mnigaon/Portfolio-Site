"use client";

import { portfolio } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";

const GSLogo3D = dynamic(() => import("@/components/GSLogo3D"), { ssr: false });

export function Hero() {
    const [logoText, setLogoText] = useState<"GS" | "Jen">("GS");
    const [isHovered, setIsHovered] = useState(false);
    const [shouldRender3D, setShouldRender3D] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const h2Ref = useRef<HTMLHeadingElement>(null);

    const handleMouseEnter = (text: "GS" | "Jen") => {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            setLogoText(text);
            setIsHovered(true);
            setShouldRender3D(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleMouseMove = (e: React.MouseEvent, type: "GS" | "Jen") => {
        if (!isHovered) return;
        
        // We use either the h1 or h2 rect for normalization depending on what's hovered
        const targetRef = type === "GS" ? h1Ref : h2Ref;
        if (!targetRef.current) return;
        
        const rect = targetRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        
        const normalizedX = (offsetX / rect.width) * 2 - 1;
        const normalizedY = -(offsetY / rect.height) * 2 + 1;

        setMousePos({ x: normalizedX, y: normalizedY });
    };
    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center py-20 lg:pt-0">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
            >
                <motion.p variants={fadeUp} className="font-mono text-[0.85rem] text-[var(--accent)] mb-5 tracking-[0.04em]">
                    {portfolio.intro}
                </motion.p>
                <motion.div variants={fadeUp} className="relative inline-flex items-center mb-2">
                    <h1 
                        ref={h1Ref}
                        className="font-head text-[clamp(3.2rem,6vw,5.5rem)] font-bold leading-[1.0] tracking-[-0.03em] text-[var(--text)] cursor-default pr-2"
                        onMouseEnter={() => handleMouseEnter("GS")}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={(e) => handleMouseMove(e, "GS")}
                    >
                        {portfolio.name}
                    </h1>
                    {/* Unified 3D Logo Position */}
                    {shouldRender3D && (
                        <GSLogo3D 
                            text={logoText}
                            isHovered={isHovered} 
                            mousePosition={mousePos} 
                            onExited={() => setShouldRender3D(false)}
                        />
                    )}
                </motion.div>
                <motion.h2 
                    ref={h2Ref}
                    variants={fadeUp} 
                    className="font-head text-[clamp(1.5rem,3vw,2.6rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--muted)] mb-10 relative flex flex-wrap"
                >
                    but you can call me&nbsp;
                    <span 
                        className="text-white cursor-default"
                        onMouseEnter={() => handleMouseEnter("Jen")}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={(e) => handleMouseMove(e, "Jen")}
                    >
                        Jenny
                    </span>
                </motion.h2>
                <motion.div variants={fadeUp} className="max-w-[520px] text-[1.05rem] text-[#9090a8] leading-[1.75] mb-[52px]" dangerouslySetInnerHTML={{ __html: portfolio.description }} />

                <motion.div variants={fadeUp} className="flex gap-4 flex-wrap">
                    <Link href="#projects" className="btn btn--primary">
                        View Projects →
                    </Link>
                    <Link href="#contact" className="btn btn--ghost">
                        Contact Me
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
