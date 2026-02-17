"use client";

import { portfolio } from "@/data/portfolio";
import { fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";

export function Skills() {
    const titles: Record<string, string> = {
        frontend: "Frontend",
        backend: "Backend & Infra",
        design: "Design",
        tools: "Tools",
    };

    return (
        <section id="skills" className="py-[120px] border-b border-white/5">
            <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-[var(--accent)] mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:max-w-[160px] after:h-[1px] after:bg-white/5"
            >
                03. Skills & Tools
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {(Object.keys(portfolio.skills) as Array<keyof typeof portfolio.skills>).map((key, i) => (
                    <motion.div
                        key={key}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        transition={{ delay: i * 0.1 }}
                    >
                        <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-[var(--accent)] mb-[18px]">
                            {titles[key]}
                        </p>
                        <ul className="flex flex-col gap-2.5">
                            {portfolio.skills[key].map((skill) => (
                                <li key={skill} className="flex items-center gap-3 text-[0.88rem] text-[#9090a8] before:content-['▸'] before:text-[var(--accent)] before:text-[0.7rem]">
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
