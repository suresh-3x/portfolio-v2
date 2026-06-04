import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Standard themes only: 'dawn' (default), 'mono'
    const [theme, setThemeState] = useState(() => {
        // Initial detection: URL > LocalStorage > Default
        const params = new URLSearchParams(window.location.search);
        const urlTheme = params.get('theme')?.toLowerCase();

        const validThemes = ['dawn', 'mono'];
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
        // RGB Editorial - LIGHT (Technical Refined)
        dawn: {
            '--bg-primary-color': '#f4f4f0',
            '--bg-primary-gradient': 'none',
            '--bg-secondary': '#ebebe6',
            '--text-primary': '#111111',
            '--text-secondary': '#666666',
            '--accent-primary': '#ff3300',
            '--accent-primary-rgb': '255, 51, 0',
            '--accent-secondary': '#00a600',
            '--accent-secondary-rgb': '0, 166, 0',
            '--accent-tertiary': '#0033ff',
            '--accent-tertiary-rgb': '0, 51, 255',
            '--on-accent': '#ffffff',
            '--border-color': 'rgba(0, 0, 0, 0.1)',
            '--card-bg': '#ffffff',
            '--card-bg-rgb': '255, 255, 255',
            '--card-border': 'rgba(0, 0, 0, 0.08)',
            '--glass-blur': '0px',
            '--shadow-soft': 'none',
            '--terminal-bg': '#111111',
            '--terminal-header': '#222222',
            '--bg-pattern': 'none',
            '--grid-color': 'rgba(0, 0, 0, 0)',
            '--is-monochrome': '0',
            '--nb-border': '#111111',
            '--nb-shadow-color': '#111111',
            '--nb-shadow': '0 0 0 transparent',
            '--nb-shadow-sm': '0 0 0 transparent',
            '--nb-border-width': '1px'
        },
        // Mono - DARK (Uber style: Black & White only)
        mono: {
            '--bg-primary-color': '#000000',
            '--bg-primary-gradient': 'none',
            '--bg-secondary': '#121212',
            '--text-primary': '#ffffff',
            '--text-secondary': '#a0a0a0',
            '--accent-primary': '#ffffff',
            '--accent-primary-rgb': '255, 255, 255',
            '--accent-secondary': '#ffffff',
            '--accent-secondary-rgb': '255, 255, 255',
            '--accent-tertiary': '#ffffff',
            '--accent-tertiary-rgb': '255, 255, 255',
            '--on-accent': '#000000',
            '--border-color': 'rgba(255, 255, 255, 0.2)',
            '--card-bg': '#121212',
            '--card-bg-rgb': '18, 18, 18',
            '--card-border': 'rgba(255, 255, 255, 0.1)',
            '--glass-blur': '0px',
            '--shadow-soft': '0 12px 48px rgba(0,0,0,0.4)',
            '--terminal-bg': '#000000',
            '--terminal-header': '#121212',
            '--bg-pattern': 'none',
            '--grid-color': 'rgba(255, 255, 255, 0.05)',
            '--is-monochrome': '1',
            '--nb-border': '#ffffff',
            '--nb-shadow-color': '#ffffff',
            '--nb-shadow': '5px 5px 0 #ffffff',
            '--nb-shadow-sm': '3px 3px 0 #ffffff',
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
        // Dark theme (mono) uses light-colored favicon (favicon-dark.svg)
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
