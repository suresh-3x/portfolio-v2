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
        // Concrete Jungle — LIGHT (Group 1: orange / blue / green + concrete grays)
        dawn: {
            '--bg-primary-color': '#f4f4f4',
            '--bg-primary-gradient': 'none',
            '--bg-secondary': '#e6e6e6',
            '--text-primary': '#212121',
            '--text-secondary': '#7d7d7d',
            '--accent-primary': '#ff5722',
            '--accent-primary-rgb': '255, 87, 34',
            '--accent-secondary': '#2196f3',
            '--accent-secondary-rgb': '33, 150, 243',
            '--accent-tertiary': '#4caf50',
            '--accent-tertiary-rgb': '76, 175, 80',
            '--on-accent': '#1a1a1a',
            '--border-color': 'rgba(33, 33, 33, 0.18)',
            '--card-bg': '#ffffff',
            '--card-bg-rgb': '255, 255, 255',
            '--card-border': 'rgba(33, 33, 33, 0.1)',
            '--glass-blur': '0px',
            '--shadow-soft': '0 10px 40px rgba(0, 0, 0, 0.05)',
            '--terminal-bg': '#ffffff',
            '--terminal-header': '#f5f5f5',
            '--bg-pattern': 'none',
            '--grid-color': 'rgba(0, 0, 0, 0.02)',
            '--is-monochrome': '0',
            '--nb-border': '#212121',
            '--nb-shadow-color': '#212121',
            '--nb-shadow': '5px 5px 0 #212121',
            '--nb-shadow-sm': '3px 3px 0 #212121',
            '--nb-border-width': '2px'
        },
        // Concrete Jungle — DARK (Group 2: #212121 base, amber accent, grays)
        dusk: {
            '--bg-primary-color': '#212121',
            '--bg-primary-gradient': 'none',
            '--bg-secondary': '#2b2b2b',
            '--text-primary': '#f5f5f5',
            '--text-secondary': '#9e9e9e',
            '--accent-primary': '#ffc107',
            '--accent-primary-rgb': '255, 193, 7',
            '--accent-secondary': '#ffd54f',
            '--accent-secondary-rgb': '255, 213, 79',
            '--accent-tertiary': '#ffb300',
            '--accent-tertiary-rgb': '255, 179, 0',
            '--on-accent': '#1a1a1a',
            '--border-color': 'rgba(255, 255, 255, 0.16)',
            '--card-bg': '#2b2b2b',
            '--card-bg-rgb': '43, 43, 43',
            '--card-border': 'rgba(255, 255, 255, 0.1)',
            '--glass-blur': '0px',
            '--shadow-soft': '0 12px 48px rgba(0,0,0,0.4)',
            '--terminal-bg': '#1a1a1a',
            '--terminal-header': '#2b2b2b',
            '--bg-pattern': 'none',
            '--grid-color': 'rgba(255, 255, 255, 0.04)',
            '--is-monochrome': '0',
            '--nb-border': '#ffffff',
            '--nb-shadow-color': '#ffc107',
            '--nb-shadow': '5px 5px 0 #ffc107',
            '--nb-shadow-sm': '3px 3px 0 #ffc107',
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
