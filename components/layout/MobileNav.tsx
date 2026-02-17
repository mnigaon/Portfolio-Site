"use client";

import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Education", id: "education" },
    { label: "Contact", id: "contact" },
];

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 h-[70px] bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 z-[100] lg:hidden">
                <a href="#hero" className="font-head font-bold text-[1.1rem] text-white flex items-center gap-2.5 no-underline">
                    <span className="w-2 h-2 rounded-full bg-[#00e5b4] shadow-[0_0_12px_#00e5b4] animate-pulse" />
                    {portfolio.name}
                </a>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white p-2 -mr-2 transition-colors hover:text-[#00e5b4]"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 bg-[#0a0a0f] z-[90] pt-[100px] px-8 lg:hidden"
                    >
                        <ul className="flex flex-col gap-8">
                            {navItems.map((item, i) => (
                                <motion.li
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={`#${item.id}`}
                                        onClick={() => setIsOpen(false)}
                                        className="font-head text-3xl font-bold text-white/70 hover:text-[#00e5b4] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="absolute bottom-12 left-8 right-8 flex gap-6 mt-auto border-t border-white/5 pt-8">
                            <a href={portfolio.social.github} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-[#8a8aa3] uppercase tracking-widest">GH</a>
                            <a href={portfolio.social.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-[#8a8aa3] uppercase tracking-widest">LI</a>
                            <a href={portfolio.social.email} className="font-mono text-sm text-[#8a8aa3] uppercase tracking-widest">EM</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
