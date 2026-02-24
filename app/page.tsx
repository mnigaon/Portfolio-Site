"use client";

import { useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const ring = useRef({ x: 0, y: 0 });
    // 실제 마우스 이동이 감지되면 true, 터치가 감지되면 false로 전환
    const [hasMouse, setHasMouse] = useState(false);

    useEffect(() => {
        // movementX/Y가 모두 0이면 터치로 인한 합성 이벤트 → 무시
        const onMouseMove = (e: MouseEvent) => {
            if (e.movementX === 0 && e.movementY === 0) return;
            setHasMouse(true);
        };
        // 터치 or 마우스가 viewport를 벗어나면 즉시 비활성화
        const onHide = () => setHasMouse(false);

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchstart", onHide, { passive: true });
        document.addEventListener("mouseleave", onHide);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchstart", onHide);
            document.removeEventListener("mouseleave", onHide);
        };
    }, []);

    useEffect(() => {
        if (!hasMouse) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
            }
        };
        window.addEventListener("mousemove", handleMouseMove);

        let animFrame: number;
        const animate = () => {
            ring.current.x += (mouse.current.x - ring.current.x) * 0.22;
            ring.current.y += (mouse.current.y - ring.current.y) * 0.22;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ring.current.x - 28}px, ${ring.current.y - 28}px)`;
            }
            animFrame = requestAnimationFrame(animate);
        };
        animFrame = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animFrame);
        };
    }, [hasMouse]);

    if (!hasMouse) return null;

    return (
        <>
            {/* 바깥 링 - 느리게 따라옴 */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-14 h-14 rounded-full border border-[#00e5b4] pointer-events-none z-[10000] opacity-70"
                style={{ willChange: "transform" }}
            />
            {/* 안쪽 점 - 즉각 반응 */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[#00e5b4] pointer-events-none z-[10000]"
                style={{ willChange: "transform" }}
            />
        </>
    );
};

const MouseGlow = () => {
    const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
    const [hasMouse, setHasMouse] = useState(false);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (e.movementX === 0 && e.movementY === 0) return;
            setHasMouse(true);
        };
        const onHide = () => setHasMouse(false);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchstart", onHide, { passive: true });
        document.addEventListener("mouseleave", onHide);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchstart", onHide);
            document.removeEventListener("mouseleave", onHide);
        };
    }, []);

    useEffect(() => {
        if (!hasMouse) return;
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [hasMouse]);

    if (!hasMouse) return null;

    return (
        <div
            className="fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 opacity-50"
            style={{
                background: `radial-gradient(250px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 229, 180, 0.22), transparent 65%)`,
            }}
        />
    );
};

export default function Home() {
    return (
        <>
            <CustomCursor />
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
