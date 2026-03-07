"use client";

import { portfolio } from "@/data/portfolio";
import { fadeUp } from "@/lib/motion";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const MockScreen = ({ variant }: { variant: number }) => {
    return (
        <div className="w-full flex flex-col gap-2.5 p-6 opacity-80">
            {variant === 0 && (
                <>
                    <div className="h-2 rounded-[2px] bg-[#00e5b4] w-3/4 opacity-35" />
                    <div className="h-2 rounded-[2px] bg-white/5 w-full" />
                    <div className="h-2 rounded-[2px] bg-white/5 w-full" />
                    <div className="h-2 rounded-[2px] bg-white/5 w-1/2" />
                    <div className="h-4" />
                    <div className="h-2 rounded-[2px] bg-[#7b61ff] w-3/4 opacity-30" />
                    <div className="h-2 rounded-[2px] bg-white/5 w-full" />
                    <div className="h-2 rounded-[2px] bg-white/5 w-1/2" />
                </>
            )}
            {variant === 1 && (
                <>
                    <div className="h-2 rounded-[2px] bg-white/5 w-1/2" />
                    <div className="h-2" />
                    <div className="h-2 rounded-[2px] bg-[#00e5b4] w-full opacity-35" />
                    <div className="h-2 rounded-[2px] bg-white/5 w-3/4" />
                    <div className="h-4" />
                    <div className="h-2 rounded-[2px] bg-white/5 w-1/2" />
                    <div className="h-2 rounded-[2px] bg-[#7b61ff] w-3/4 opacity-30" />
                    <div className="h-2 rounded-[2px] bg-white/5 w-full" />
                </>
            )}
            {variant === 2 && (
                <>
                    <div className="h-2 rounded-[2px] bg-[#7b61ff] w-3/4 opacity-30" />
                    <div className="h-2 rounded-[2px] bg-white/5 w-full" />
                    <div className="h-3" />
                    <div className="h-2 rounded-[2px] bg-[#00e5b4] w-1/2 opacity-35" />
                    <div className="h-2 rounded-[2px] bg-white/5 w-3/4" />
                    <div className="h-2 rounded-[2px] bg-white/5 w-full" />
                    <div className="h-2 rounded-[2px] bg-white/5 w-1/2" />
                </>
            )}
        </div>
    )
}

interface Project {
    num: string;
    title: string;
    description: string;
    tags: string[];
    links: { label: string; href: string }[];
    image?: string;
}

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // ESC key to close modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedProject(null);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedProject]);

    return (
        <section id="projects" className="py-[120px] border-b border-white/5">
            <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-[var(--accent)] mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:max-w-[160px] after:h-[1px] after:bg-white/5"
            >
                02. Projects
            </motion.p>

            <div className="flex flex-col gap-0 border-t border-white/5">
                {portfolio.projects.map((project, i) => (
                    <motion.article
                        key={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        onClick={() => setSelectedProject(project)}
                        className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 lg:gap-12 items-start py-12 border-b border-white/5 group cursor-pointer"
                    >
                        {/* 텍스트 블록: 모바일에서는 순서 1번 */}
                        <div className="flex flex-col gap-3.5 pt-1.5 order-1 lg:order-2">
                            <span className="font-mono text-[0.65rem] text-[var(--accent)] tracking-[0.14em]">{project.num}</span>
                            <h3 className="font-head text-[1.5rem] font-bold tracking-tight text-[var(--text)] leading-[1.2]">{project.title}</h3>

                            {/* 이미지: 모바일에서만 h3 바로 아래에 표시 (lg에서는 숨김) */}
                            <div className="block lg:hidden aspect-[16/10] bg-[var(--surface)] border border-white/5 rounded overflow-hidden relative transition-colors duration-300 group-hover:border-[#00e5b44d]">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#00e5b40f] to-[#7b61ff14] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />
                                <div className="w-full h-full flex items-center justify-center relative">
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <MockScreen variant={i % 3} />
                                    )}
                                </div>
                            </div>

                            <p className="text-[0.9rem] text-[#7a7a92] leading-[1.75] line-clamp-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {project.tags.map(tag => (
                                    <span key={tag} className="font-mono text-[0.65rem] tracking-[0.1em] px-2.5 py-1 border border-white/5 rounded text-[var(--muted)] bg-[var(--surface)] uppercase">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 이미지 블록: lg 이상에서만 표시 */}
                        <div className="hidden lg:block aspect-[16/10] bg-[var(--surface)] border border-white/5 rounded overflow-hidden relative transition-colors duration-300 group-hover:border-[#00e5b44d] order-2 lg:order-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00e5b40f] to-[#7b61ff14] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />
                            <div className="w-full h-full flex items-center justify-center relative">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <MockScreen variant={i % 3} />
                                )}
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-[900px] max-h-[90vh] bg-[var(--surface)] border border-white/10 rounded-xl overflow-hidden shadow-2xl overflow-y-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {/* Image Half */}
                                <div className="aspect-[16/10] md:aspect-auto bg-black relative">
                                    {selectedProject.image ? (
                                        <Image
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <MockScreen variant={0} />
                                        </div>
                                    )}
                                </div>

                                {/* Details Half */}
                                <div className="p-8 md:p-12 flex flex-col gap-6">
                                    <div>
                                        <span className="font-mono text-[0.7rem] text-[var(--accent)] tracking-[0.2em] uppercase mb-2 block">
                                            Project {selectedProject.num}
                                        </span>
                                        <h2 className="font-head text-[2rem] font-bold text-white tracking-tight">
                                            {selectedProject.title}
                                        </h2>
                                    </div>

                                    <div className="h-[1px] w-12 bg-[var(--accent)]/50" />

                                    <p className="text-[1rem] text-[#9090a8] leading-relaxed">
                                        {selectedProject.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tags.map(tag => (
                                            <span key={tag} className="font-mono text-[0.65rem] tracking-[0.1em] px-3 py-1.5 border border-white/10 rounded-full text-[#9090a8] bg-white/5 uppercase">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-6 mt-4">
                                        {selectedProject.links.map(link => (
                                            <a
                                                key={link.label}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-mono text-[0.75rem] tracking-[0.1em] uppercase text-[var(--accent)] flex items-center gap-2 group/link"
                                            >
                                                {link.label}
                                                <span className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">↗</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    )
}
