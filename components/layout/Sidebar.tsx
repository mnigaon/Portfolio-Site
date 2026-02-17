"use client";

import Link from "next/link";
import { useActiveSection } from "@/hooks/useActiveSection";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Education", id: "education" },
    { label: "Contact", id: "contact" },
];

export function Sidebar() {
    const activeSection = useActiveSection();

    return (
        <aside className="fixed top-0 left-0 h-screen w-[260px] flex flex-col justify-between p-12 border-r border-white/5 z-50 hidden lg:flex bg-[#0a0a0f]">
            <Link href="#hero" className="font-head text-[1.15rem] font-bold tracking-tight text-white flex items-center gap-2.5 no-underline">
                <span className="w-2 h-2 rounded-full bg-[#00e5b4] shadow-[0_0_12px_#00e5b4] animate-pulse" />
                {portfolio.name}
            </Link>

            <nav className="flex flex-col gap-0.5">
                {navItems.map((item) => (
                    <Link
                        key={item.id}
                        href={`#${item.id}`}
                        className={cn(
                            "group flex items-center gap-3.5 py-2.5 font-mono text-[0.72rem] tracking-[0.12em] uppercase text-[#8a8aa3] transition-colors duration-250 relative",
                            activeSection === item.id ? "text-[#00e5b4]" : "hover:text-white"
                        )}
                    >
                        <span
                            className={cn(
                                "block h-[1px] bg-[#00e5b4] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                activeSection === item.id ? "w-6" : "w-0 group-hover:w-6"
                            )}
                        />
                        <span className={cn(
                            "transition-colors duration-250",
                            activeSection === item.id ? "text-[#00e5b4]" : "group-hover:text-white"
                        )}>
                            {item.label}
                        </span>
                    </Link>
                ))}
            </nav>

            <div className="flex flex-col gap-4">
                <a href={portfolio.social.github} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.68rem] text-[#8a8aa3] tracking-[0.08em] hover:text-[#00e5b4] transition-colors">
                    GitHub
                </a>
                <a href={portfolio.social.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.68rem] text-[#8a8aa3] tracking-[0.08em] hover:text-[#00e5b4] transition-colors">
                    LinkedIn
                </a>
                <a href={portfolio.social.email} className="font-mono text-[0.68rem] text-[#8a8aa3] tracking-[0.08em] hover:text-[#00e5b4] transition-colors">
                    Email
                </a>
            </div>
        </aside>
    );
}
