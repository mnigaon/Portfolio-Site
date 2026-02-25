"use client";

import { portfolio } from "@/data/portfolio";
import { fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";

export function Contact() {
    return (
        <section id="contact" className="relative py-[120px] flex flex-col justify-center min-h-[60vh]">
            <div className="absolute top-0 bottom-0 left-[-6vw] right-[-50vw] lg:left-[-260px] pointer-events-none z-0">
                <ParticlesBackground />
            </div>
            <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-[var(--accent)] mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:max-w-[160px] after:h-[1px] after:bg-white/5"
            >
                05. Get In Touch
            </motion.p>

            <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-head text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.03em] leading-[1.05] mb-7"
            >
                Let&apos;s make <span className="text-[var(--accent)]">something great</span><br />together.
            </motion.h2>

            <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="max-w-[460px] text-[0.95rem] text-[#7a7a92] leading-[1.8] mb-12"
            >
                Whether it&apos;s a new opportunity, a collaboration proposal, or just a simple hello, I&apos;m always open.
                I&apos;ll get back to you as soon as possible.
            </motion.p>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex gap-5 flex-wrap"
            >
                <a href={portfolio.social.email} className="btn btn--primary">
                    Send Email →
                </a>
                <a href={portfolio.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                    LinkedIn
                </a>
                <a href={portfolio.social.github} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                    GitHub
                </a>
            </motion.div>
        </section>
    )
}
