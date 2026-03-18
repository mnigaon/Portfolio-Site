"use client";

import { portfolio } from "@/data/portfolio";
import { fadeUp } from "@/lib/motion";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type FilterKey = "all" | "frontend" | "backend" | "tools" | "currentlyWorkingOn";

const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "tools", label: "Tools" },
    { key: "currentlyWorkingOn", label: "Working On" },
];

const titles: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    tools: "Tools",
    currentlyWorkingOn: "Currently Working On",
};

/* 숙련도에 따른 게이지 색상 */
function getLevelColor(level: number, categoryKey?: string) {
    if (categoryKey === "currentlyWorkingOn") {
        return "from-white/80 to-white/40";
    }
    if (level >= 90) return "from-[var(--accent)] to-[var(--accent)]";
    if (level >= 75) return "from-[var(--accent)]/80 to-[var(--accent)]/60";
    return "from-[var(--accent)]/50 to-[var(--accent)]/30";
}

/* 숙련도 레이블 */
function getLevelLabel(level: number) {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    return "Familiar";
}

export function Skills() {
    const [active, setActive] = useState<FilterKey>("all");

    const visibleKeys = (
        Object.keys(portfolio.skills) as Array<keyof typeof portfolio.skills>
    ).filter((key) => active === "all" || key === active);

    return (
        <section id="skills" className="py-[120px] border-b border-white/5">

            {/* 섹션 레이블 */}
            <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-[var(--accent)] mb-8 flex items-center gap-4 after:content-[''] after:flex-1 after:max-w-[160px] after:h-[1px] after:bg-white/5"
            >
                03. Skills &amp; Tools
            </motion.p>

            {/* 필터 버튼 */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex gap-2 mb-12 flex-wrap"
            >
                {filters.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setActive(key)}
                        className={`
                            px-5 py-2 font-mono text-[0.65rem] tracking-[0.18em] uppercase
                            rounded-full border transition-all duration-300
                            ${active === key
                                ? key === "currentlyWorkingOn"
                                    ? "border-white/80 text-white/90 bg-white/10"
                                    : "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10"
                                : "border-white/10 text-[#9090a8] hover:border-white/25 hover:text-white/70"
                            }
                        `}
                    >
                        {label}
                    </button>
                ))}
            </motion.div>

            {/* 스킬 그리드 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
                <AnimatePresence mode="popLayout">
                    {visibleKeys.map((key, i) => (
                        <motion.div
                            key={key}
                            layout
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3, delay: i * 0.07 }}
                        >
                            {/* 카테고리 제목 */}
                            <p className={`font-mono text-[0.65rem] tracking-[0.18em] uppercase mb-5 ${key === "currentlyWorkingOn" ? "text-white/80" : "text-[var(--accent)]"}`}>
                                {titles[key]}
                            </p>

                            {/* 스킬 게이지 목록 */}
                            <ul className="flex flex-col gap-4">
                                {portfolio.skills[key].map((skill, j) => (
                                    <li key={skill.name}>
                                        {/* 스킬 이름 + 퍼센트 */}
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-[0.85rem] text-white/70">
                                                {skill.name}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-[0.6rem] tracking-widest text-[#9090a8] uppercase">
                                                    {getLevelLabel(skill.level)}
                                                </span>
                                                <span className={`font-mono text-[0.72rem] ${key === "currentlyWorkingOn" ? "text-white/90" : "text-[var(--accent)]"}`}>
                                                    {skill.level}%
                                                </span>
                                            </div>
                                        </div>

                                        {/* 게이지 바 */}
                                        <div className="h-[3px] w-full rounded-full bg-white/5 overflow-hidden">
                                            <motion.div
                                                className={`h-full rounded-full bg-gradient-to-r ${getLevelColor(skill.level, key)}`}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 1,
                                                    delay: i * 0.05 + j * 0.06,
                                                    ease: "easeOut",
                                                }}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}
