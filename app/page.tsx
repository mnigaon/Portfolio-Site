"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import SplashCursor from "@/components/SplashCursor";
import Waves from "@/components/Waves";

export default function Home() {
    return (
        <>
            {/* Global Waves Background */}
            <div className="fixed inset-0 z-[-1] pointer-events-none opacity-30">
                <Waves
                    lineColor="#5227FF"
                    backgroundColor="transparent"
                    waveSpeedX={0.02}
                    waveSpeedY={0.01}
                    waveAmpX={40}
                    waveAmpY={20}
                    friction={0.9}
                    tension={0.01}
                    maxCursorMove={120}
                    xGap={12}
                    yGap={36}
                />
            </div>
            <MobileNav />
            <div className="flex min-h-screen overflow-x-hidden">
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

            {/* Splash Effect - Always on Top but ignores pointer events */}
            <SplashCursor
                SIM_RESOLUTION={128}
                DYE_RESOLUTION={1440}
                DENSITY_DISSIPATION={3.5}
                VELOCITY_DISSIPATION={2}
                PRESSURE={0.1}
                CURL={3}
                SPLAT_RADIUS={0.2}
                SPLAT_FORCE={6000}
                COLOR_UPDATE_SPEED={10}
            />
        </>
    );
}
