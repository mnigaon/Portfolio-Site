"use client";

import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const particlesOptions = {
    fullScreen: { enable: false },
    background: {
        color: { value: "transparent" },
    },
    fpsLimit: 60,
    particles: {
        number: {
            value: 200,
            density: {
                enable: true,
            },
        },
        color: {
            // 포트폴리오 테마: 민트(accent) + 보라(accent2) + 라벤더 화이트
            value: ["#00e5b4", "#7b61ff", "#00c99a", "#a18fff", "#e8e8f0"] as string[],
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: { min: 0.1, max: 0.55 },
            animation: {
                enable: true,
                speed: 0.5,
                sync: false,
            },
        },
        size: {
            value: { min: 0.8, max: 2.2 },
            animation: {
                enable: true,
                speed: 0.8,
                sync: false,
            },
        },
        move: {
            enable: true,
            speed: { min: 0.1, max: 0.4 },
            direction: "none" as const,
            random: true,
            straight: false,
            outModes: { default: "out" as const },
            drift: 0.08,
        },
        twinkle: {
            particles: {
                enable: true,
                frequency: 0.05,
                opacity: 0.9,
            },
        },
    },
    detectRetina: true,
};

export function ParticlesBackground() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = useCallback(
        async (_container: unknown) => { },
        []
    );

    if (!init) return null;

    return (
        <Particles
            id="contact-particles"
            className="absolute inset-0 w-full h-full pointer-events-none"
            particlesLoaded={particlesLoaded}
            options={particlesOptions}
        />
    );
}
