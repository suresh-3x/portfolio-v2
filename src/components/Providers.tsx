"use client";

import React from 'react';
import { ThemeProvider } from "../context/ThemeContext";
import { Analytics } from "@vercel/analytics/react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            {children}
            <Analytics mode="production" />
        </ThemeProvider>
    );
}
