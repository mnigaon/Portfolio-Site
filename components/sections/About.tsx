"use client";

import { portfolio } from "@/data/portfolio";
import { fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Lanyard from "./Lanyard";

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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="relative order-1 lg:order-2"
                >
                    <div className="w-full aspect-[4/5] md:aspect-[3/4] rounded overflow-hidden relative">
                        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
                    </div>
                </motion.div>

                {/* 텍스트 + 버튼: 모바일에서 2번 (이미지 아래), 데스크탑에서 1번 (왼쪽) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="text-[0.98rem] text-[#9090a8] leading-[1.85] space-y-5 order-2 lg:order-1"
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
            </div>
        </section>
    );
}
