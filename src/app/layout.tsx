import type { Metadata, Viewport } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceMono = Space_Mono({
    weight: ['400', '700'],
    subsets: ["latin"],
    variable: "--font-mono"
});

export const metadata: Metadata = {
    title: "Suresh Bhandari | Full-Stack Engineer",
    description: "Architecting scalable systems. Portfolio of Suresh Bhandari.",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#0f172a",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.variable} ${spaceMono.variable} antialiased`}>{children}</body>
        </html>
    );
}
