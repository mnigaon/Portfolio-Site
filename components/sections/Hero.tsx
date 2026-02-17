"use client";

import { portfolio } from "@/data/portfolio";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
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
                <motion.h1 variants={fadeUp} className="font-head text-[clamp(3.2rem,6vw,5.5rem)] font-bold leading-[1.0] tracking-[-0.03em] text-[var(--text)] mb-2">
                    {portfolio.name}
                </motion.h1>
                <motion.h2 variants={fadeUp} className="font-head text-[clamp(1.5rem,3vw,2.6rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--muted)] mb-10">
                    {portfolio.title}
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
