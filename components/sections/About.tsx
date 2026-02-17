"use client";

import { portfolio } from "@/data/portfolio";
import { fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
    return (
        <section id="about" className="py-[120px] border-b border-white/5">
            <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-[var(--accent)] mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:max-w-[160px] after:h-[1px] after:bg-white/5"
            >
                01. About
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="text-[0.98rem] text-[#9090a8] leading-[1.85] space-y-5"
                >
                    <p>
                        My journey into coding started with simple <em className="not-italic text-[var(--accent)]">curiosity</em>.
                        The question &quot;Why does this button react like this?&quot; led me into the world of front-end development.
                    </p>
                    <p>
                        Now, that curiosity has turned into <em className="not-italic text-[var(--accent)]">obsession</em>.
                        0.1s animation delays, 1px spacing, context for screen readers —
                        I believe invisible details build product trust.
                    </p>
                    <p>
                        Currently, I focus on <em className="not-italic text-[var(--accent)]">Next.js, TypeScript, and Tailwind CSS</em> to build interfaces that capture both performance and accessibility.
                    </p>

                    <div className="pt-4">
                        <a
                            href={portfolio.social.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--primary inline-flex"
                        >
                            My Resume
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="relative"
                >
                    <div className="w-full aspect-[3/4] bg-[var(--surface)] border border-white/5 rounded overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00e5b414] to-[#7b61ff0f] z-10 opacity-50 group-hover:opacity-20 transition-opacity duration-500" />
                        <Image
                            src="/gaonsun.jpg"
                            alt="Gaon Sun"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <div className="absolute inset-[-4px] border border-[var(--accent)] rounded opacity-30 translate-x-2 translate-y-2 -z-10" />
                </motion.div>
            </div>
        </section>
    );
}
