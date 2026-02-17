"use client";

import { portfolio } from "@/data/portfolio";
import { fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";

export function Education() {
    return (
        <section id="education" className="py-[120px] border-b border-white/5">
            <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-[var(--accent)] mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:max-w-[160px] after:h-[1px] after:bg-white/5"
            >
                04. Education
            </motion.p>

            <div className="flex flex-col gap-12">
                {portfolio.education.map((edu, i) => (
                    <motion.div
                        key={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-center"
                    >
                        <div className="flex flex-col gap-4">
                            <span className="font-mono text-[0.7rem] text-[var(--accent)] tracking-[0.1em] uppercase">
                                {edu.period}
                            </span>
                            <h3 className="font-head text-[1.8rem] font-bold tracking-tight text-white leading-tight">
                                {edu.school}
                            </h3>
                            <p className="text-[1.1rem] font-medium text-[#9090a8]">
                                {edu.degree}
                            </p>
                            <div className="flex items-center gap-3 text-[0.85rem] text-[#5a5a72] font-mono">
                                <span>{edu.location}</span>
                                <span className="w-1 h-1 rounded-full bg-white/10" />
                                <a
                                    href={edu.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--accent)] hover:underline"
                                >
                                    Visit Website ↗
                                </a>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="aspect-[4/3] bg-[var(--surface)] border border-white/5 rounded-lg overflow-hidden relative transition-transform duration-500 group-hover:scale-[1.02]">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent z-10 opacity-40" />
                                <Image
                                    src={edu.image}
                                    alt={edu.school}
                                    fill
                                    className="object-cover transition-all duration-700"
                                />
                            </div>
                            <div className="absolute inset-[-8px] border border-[var(--accent)] rounded-lg opacity-10 -z-10 group-hover:opacity-20 transition-opacity" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
