import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Standard themes only: 'dawn' (default), 'dusk'
    const [theme, setThemeState] = useState(() => {
        // Initial detection: URL > LocalStorage > Default
        const params = new URLSearchParams(window.location.search);
        const urlTheme = params.get('theme')?.toLowerCase();

        const validThemes = ['dawn', 'dusk'];
        if (urlTheme && validThemes.includes(urlTheme)) return urlTheme;

        const stored = localStorage.getItem('portfolio-theme');
        if (stored && validThemes.includes(stored)) return stored;

        return 'dawn';
    });

    const setTheme = (newTheme) => {
        setThemeState(newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    };

    // Theme Data Definitions
    const themes = {
        dawn: {
            '--bg-primary-color': '#f1f5f9',
            '--bg-primary-gradient': 'none',
            '--bg-secondary': '#e2e8f0',
            '--text-primary': '#0f172a',
            '--text-secondary': '#475569',
            '--accent-primary': '#ea580c',
            '--accent-primary-rgb': '234, 88, 12',
            '--accent-secondary': '#c2410c',
            '--accent-secondary-rgb': '194, 65, 12',
            '--accent-tertiary': '#b45309',
            '--accent-tertiary-rgb': '180, 83, 9',
            '--border-color': 'rgba(15, 23, 42, 0.12)',
            '--card-bg': '#ffffff',
            '--card-bg-rgb': '255, 255, 255',
            '--card-border': 'rgba(15, 23, 42, 0.08)',
            '--glass-blur': '0px',
            '--shadow-soft': '0 10px 40px rgba(0, 0, 0, 0.05)',
            '--terminal-bg': '#ffffff',
            '--terminal-header': '#f8fafc',
            '--bg-pattern': 'none',
            '--grid-color': 'rgba(0, 0, 0, 0.02)',
            '--is-monochrome': '0',
            '--nb-border': '#111111',
            '--nb-shadow-color': '#111111',
            '--nb-shadow': '5px 5px 0 #111111',
            '--nb-shadow-sm': '3px 3px 0 #111111',
            '--nb-border-width': '2px'
        },
        dusk: {
            '--bg-primary-color': '#0a0c10',
            '--bg-primary-gradient': 'none',
            '--bg-secondary': '#12151c',
            '--text-primary': '#f8fafc',
            '--text-secondary': '#94a3b8',
            '--accent-primary': '#fb923c',
            '--accent-primary-rgb': '251, 146, 60',
            '--accent-secondary': '#fbbf24',
            '--accent-secondary-rgb': '251, 191, 36',
            '--accent-tertiary': '#fdba74',
            '--accent-tertiary-rgb': '253, 186, 116',
            '--border-color': 'rgba(255, 255, 255, 0.1)',
            '--card-bg': '#1b1818c5',
            '--card-bg-rgb': '27, 24, 24',
            '--card-border': 'rgba(255, 255, 255, 0.06)',
            '--glass-blur': '0px',
            '--shadow-soft': '0 12px 48px rgba(0,0,0,0.4)',
            '--terminal-bg': '#030712',
            '--terminal-header': '#111827',
            '--bg-pattern': 'none',
            '--grid-color': 'rgba(255, 255, 255, 0.03)',
            '--is-monochrome': '0',
            '--nb-border': '#f5f5f5',
            '--nb-shadow-color': '#fb923c',
            '--nb-shadow': '5px 5px 0 #fb923c',
            '--nb-shadow-sm': '3px 3px 0 #fb923c',
            '--nb-border-width': '2px'
        }
    };

    // Apply CSS Variables and Data Attribute
    useEffect(() => {
        const root = document.documentElement;
        const currentTheme = themes[theme];

        if (!currentTheme) return;

        root.setAttribute('data-theme', theme);

        Object.entries(currentTheme).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });

        // Set text-primary-rgb helper
        if (theme === 'dawn') {
            root.style.setProperty('--text-primary-rgb', '0, 0, 0');
        } else {
            root.style.setProperty('--text-primary-rgb', '255, 255, 255');
        }

        document.body.style.backgroundColor = currentTheme['--bg-primary-color'];
        document.body.style.color = currentTheme['--text-primary'];

        // Update favicon based on theme
        // Light theme (dawn) uses dark-colored favicon (favicon-light.svg)
        // Dark theme (dusk) uses light-colored favicon (favicon-dark.svg)
        const isLightTheme = theme === 'dawn';
        const faviconPath = isLightTheme ? '/favicon-light.svg' : '/favicon-dark.svg';

        // Remove existing favicon links
        const existingFavicons = document.querySelectorAll('link[rel="icon"]');
        existingFavicons.forEach(link => link.remove());

        // Add new favicon
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/svg+xml';
        link.href = faviconPath;
        document.head.appendChild(link);

    }, [theme]);

    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
