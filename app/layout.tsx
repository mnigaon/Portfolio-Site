import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Syne } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm-sans",
    display: "swap",
});

const dmMono = DM_Mono({
    weight: ["400", "500"],
    subsets: ["latin"],
    variable: "--font-dm-mono",
    display: "swap",
});

const syne = Syne({
    subsets: ["latin"],
    variable: "--font-syne",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Gaon Sun - Portfolio",
    description: "Software Developer & UI/UX Designer",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${dmSans.variable} ${dmMono.variable} ${syne.variable}`}>
            <body className="antialiased">{children}</body>
        </html>
    );
}
