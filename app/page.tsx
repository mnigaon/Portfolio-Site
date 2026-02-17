"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

const MouseGlow = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            className="fixed inset-0 pointer-events-none z-[9999] opacity-50 transition-opacity duration-500"
            style={{
                background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 229, 180, 0.15), transparent 80%)`,
            }}
        />
    );
};

export default function Home() {
    return (
        <>
            <MouseGlow />
            <MobileNav />
            <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex-1 max-w-[1000px] w-full px-6 md:px-12 lg:px-16 lg:ml-[260px]">
                    <Hero />
                    <About />
                    <Projects />
                    <Skills />
                    <Education />
                    <Contact />
                </main>
            </div>

            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-200px] left-[100px] w-[600px] h-[600px] bg-[#00e5b4] rounded-full blur-[120px] opacity-[0.06]" />
                <div className="absolute bottom-[100px] right-[-100px] w-[500px] h-[500px] bg-[#7b61ff] rounded-full blur-[120px] opacity-[0.06]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            </div>
        </>
    );
}
