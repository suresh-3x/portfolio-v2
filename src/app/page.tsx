"use client";

import PortfolioApp from "@/components/PortfolioApp";
import { Providers } from "@/components/Providers";
import dynamic from 'next/dynamic';

// Disable SSR for the main app if it relies heavily on window/document in render
// But we want SEO... Layouts should be fine. 
// PortfolioApp imports 'Layout' which has <style> tags.
// Let's rely on standard client rendering for now.

const PortfolioAppNoSSR = dynamic(() => import('@/components/PortfolioApp'), { ssr: false });

export default function Home() {
    return (
        <Providers>
            <PortfolioAppNoSSR />
        </Providers>
    );
}
