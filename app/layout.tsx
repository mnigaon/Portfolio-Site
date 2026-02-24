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
    description: "Software Developer & UI/UX Designer. Building accessible and pixel-perfect digital experiences at the intersection of design and engineering.",
    metadataBase: new URL("https://itsgaon.com/"),
    openGraph: {
        title: "Gaon Sun - Portfolio",
        description: "Software Developer & UI/UX Designer. Building accessible and pixel-perfect digital experiences.",
        url: "https://itsgaon.com/",
        siteName: "Gaon Sun Portfolio",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Gaon Sun - Software Developer & UI/UX Designer",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gaon Sun - Portfolio",
        description: "Software Developer & UI/UX Designer. Building accessible and pixel-perfect digital experiences.",
        images: ["/og-image.png"],
    },
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
