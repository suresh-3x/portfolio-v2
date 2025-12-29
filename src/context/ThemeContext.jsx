import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Standard themes only: 'dawn', 'dusk', 'mono-light', 'mono-dark'
    const [theme, setThemeState] = useState(() => {
        // Initial detection: URL > LocalStorage > Default
        const params = new URLSearchParams(window.location.search);
        const urlTheme = params.get('theme')?.toLowerCase();

        const validThemes = ['dawn', 'dusk', 'mono-light', 'mono-dark'];
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
            '--accent-primary': '#e11d48',
            '--accent-primary-rgb': '225, 29, 72',
            '--accent-secondary': '#059669',
            '--accent-secondary-rgb': '5, 150, 105',
            '--accent-tertiary': '#2563eb',
            '--accent-tertiary-rgb': '37, 99, 235',
            '--border-color': 'rgba(15, 23, 42, 0.12)',
            '--card-bg': '#ffffff',
            '--card-border': 'rgba(15, 23, 42, 0.08)',
            '--glass-blur': '0px',
            '--shadow-soft': '0 10px 40px rgba(0, 0, 0, 0.05)',
            '--terminal-bg': '#ffffff',
            '--terminal-header': '#f8fafc',
            '--bg-pattern': 'none',
            '--grid-color': 'rgba(0, 0, 0, 0.02)',
            '--is-monochrome': '0'
        },
        dusk: {
            '--bg-primary-color': '#0a0c10',
            '--bg-primary-gradient': 'none',
            '--bg-secondary': '#12151c',
            '--text-primary': '#f8fafc',
            '--text-secondary': '#94a3b8',
            '--accent-primary': '#f43f5e',
            '--accent-primary-rgb': '244, 63, 94',
            '--accent-secondary': '#10b981',
            '--accent-secondary-rgb': '16, 185, 129',
            '--accent-tertiary': '#3b82f6',
            '--accent-tertiary-rgb': '59, 130, 246',
            '--border-color': 'rgba(255, 255, 255, 0.1)',
            '--card-bg': '#111827',
            '--card-border': 'rgba(255, 255, 255, 0.06)',
            '--glass-blur': '0px',
            '--shadow-soft': '0 12px 48px rgba(0,0,0,0.4)',
            '--terminal-bg': '#030712',
            '--terminal-header': '#111827',
            '--bg-pattern': 'none',
            '--grid-color': 'rgba(255, 255, 255, 0.03)',
            '--is-monochrome': '0'
        },
        'mono-light': {
            '--bg-primary-color': '#f5f5f5',
            '--bg-primary-gradient': 'none',
            '--bg-secondary': '#eeeeee',
            '--text-primary': '#000000',
            '--text-secondary': '#444444',
            '--accent-primary': '#555555',
            '--accent-primary-rgb': '85, 85, 85',
            '--accent-secondary': '#555555',
            '--accent-tertiary': '#555555',
            '--border-color': 'rgba(0, 0, 0, 0.12)',
            '--card-bg': '#ffffff',
            '--card-border': 'rgba(0, 0, 0, 0.08)',
            '--glass-blur': '0px',
            '--shadow-soft': '0 8px 30px rgba(0, 0, 0, 0.06)',
            '--terminal-bg': '#ffffff',
            '--terminal-header': '#f0f0f0',
            '--bg-pattern': 'none',
            '--grid-color': 'rgba(0, 0, 0, 0.02)',
            '--is-monochrome': '1'
        },
        'mono-dark': {
            '--bg-primary-color': '#000000',
            '--bg-primary-gradient': '#000000',
            '--bg-secondary': '#080808',
            '--text-primary': '#ffffff',
            '--text-secondary': '#999999',
            '--accent-primary': '#aaaaaa',
            '--accent-primary-rgb': '170, 170, 170',
            '--accent-secondary': '#aaaaaa',
            '--accent-tertiary': '#aaaaaa',
            '--border-color': '#222222',
            '--card-bg': '#000000',
            '--card-border': '#222222',
            '--glass-blur': '0px',
            '--shadow-soft': 'none',
            '--terminal-bg': '#000000',
            '--terminal-header': '#0a0a0a',
            '--bg-pattern': 'none',
            '--grid-color': 'rgba(255, 255, 255, 0.05)',
            '--is-monochrome': '1'
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
        if (theme === 'dawn' || theme === 'mono-light') {
            root.style.setProperty('--text-primary-rgb', '0, 0, 0');
        } else {
            root.style.setProperty('--text-primary-rgb', '255, 255, 255');
        }

        document.body.style.backgroundColor = currentTheme['--bg-primary-color'];
        document.body.style.color = currentTheme['--text-primary'];

        // Update favicon based on theme
        // Light themes (dawn, mono-light) use dark favicon
        // Dark themes (dusk, mono-dark) use light favicon
        const isLightTheme = theme === 'dawn' || theme === 'mono-light';
        const faviconPath = isLightTheme ? '/favicon-dark.svg' : '/favicon-light.svg';
        
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
