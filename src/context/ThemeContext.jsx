import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Default theme is 'mono-dark'
    const [theme, setTheme] = useState('mono-dark');
    // 'ambient' (dawn, dusk) or 'system' (rgb, monochrome) - keeping for legacy, though specific themes override this
    const [mode, setMode] = useState('system');

    // Dynamic Theme State
    const [dynamicThemeEnabled, setDynamicThemeEnabledState] = useState(false);

    // Initialize state from localStorage and URL on mount
    useEffect(() => {
        // 1. Check URL params for explicit route (e.g. ?theme=noir)
        const params = new URLSearchParams(window.location.search);
        const themeParam = params.get('theme');

        const themeMap = {
            'aurora': 'dawn',
            'dawn': 'dawn',
            'midnight': 'dusk',
            'dusk': 'dusk',
            'matrix': 'dusk',     // Fallback for legacy
            'rgb': 'dusk',        // Fallback for legacy
            'noir': 'mono-dark',
            'monochrome': 'mono-dark',
            'mono-light': 'mono-light',
            'mono-dark': 'mono-dark'
        };

        if (themeParam && themeMap[themeParam.toLowerCase()]) {
            setTheme(themeMap[themeParam.toLowerCase()]);
            // If explicit theme set via URL, we likely want to disable dynamic switching momentarily or just let it be overrides
            // But if user sets URL, they expect that theme.
        } else {
            // 2. If no URL param, check localStorage for dynamic preference
            const storedDynamic = localStorage.getItem('dynamicThemeEnabled');
            if (storedDynamic === 'true') {
                setDynamicThemeEnabledState(true);
            }
        }
    }, []);

    // Wrapper to update state and localStorage
    const setDynamicThemeEnabled = (enabled) => {
        setDynamicThemeEnabledState(enabled);
        localStorage.setItem('dynamicThemeEnabled', enabled ? 'true' : 'false');
    };

    // Dynamic Time-Based Logic
    useEffect(() => {
        if (!dynamicThemeEnabled) return;

        const checkTimeAndSetTheme = () => {
            const hour = new Date().getHours();

            // Scheme:
            // 06:00 - 16:59: Dawn (Aurora) -> Day
            // 17:00 - 19:59: Dusk (Midnight) -> Evening
            // 20:00 - 23:59: RGB (Matrix) -> Night
            // 00:00 - 05:59: Monochrome (Noir) -> Post Midnight

            let targetTheme = 'rgb'; // Default fallback

            if (hour >= 6 && hour < 17) {
                targetTheme = 'dawn';
            } else if (hour >= 17 && hour < 20) {
                targetTheme = 'dusk';
            } else if (hour >= 20) {
                targetTheme = 'rgb';
            } else { // 00 to 05
                targetTheme = 'monochrome';
            }

            setTheme(prev => {
                if (prev !== targetTheme) return targetTheme;
                return prev;
            });
        };

        // Check immediately
        checkTimeAndSetTheme();

        // Check every minute
        const interval = setInterval(checkTimeAndSetTheme, 60000);
        return () => clearInterval(interval);
    }, [dynamicThemeEnabled]);


    // Theme Data Definitions
    const themes = {
        dawn: {
            '--bg-primary-color': '#f4f6f8',
            '--bg-primary-gradient': 'linear-gradient(135deg, #f4f6f8 0%, #e1e4e8 100%)',
            '--bg-secondary': '#f6f8fa',
            '--text-primary': '#1f2328',
            '--text-secondary': '#656d76',
            '--accent-primary': '#cf222e',   /* R-PRIMARY: Red */
            '--accent-primary-rgb': '207, 34, 46',
            '--accent-secondary': '#1a7f37', /* G-SECONDARY: Green */
            '--accent-secondary-rgb': '26, 127, 55',
            '--accent-tertiary': '#0969da',  /* B-TERTIARY: Blue */
            '--accent-tertiary-rgb': '9, 105, 218',
            '--border-color': 'rgba(27, 31, 35, 0.15)',
            '--card-bg': 'rgba(255, 255, 255, 0.9)',
            '--card-border': 'rgba(27, 31, 35, 0.15)',
            '--glass-blur': '16px',
            '--shadow-soft': '0 8px 32px rgba(0, 0, 0, 0.08)',
            '--terminal-bg': '#ffffff',
            '--terminal-header': '#f6f8fa',
            '--bg-pattern': 'radial-gradient(circle at 1px 1px, rgba(207, 34, 46, 0.1) 1px, transparent 0)',
            '--grid-color': 'rgba(207, 34, 46, 0.05)',
            '--is-monochrome': '0'
        },
        dusk: {
            '--bg-primary-color': '#0d1117',
            '--bg-primary-gradient': 'linear-gradient(135deg, #161b22 0%, #0d1117 100%)',
            '--bg-secondary': '#161b22',
            '--text-primary': '#e6edf3',
            '--text-secondary': '#8b949e',
            '--accent-primary': '#f85149',   /* R-PRIMARY: Red */
            '--accent-primary-rgb': '248, 81, 73',
            '--accent-secondary': '#3fb950', /* G-SECONDARY: Green */
            '--accent-secondary-rgb': '63, 185, 80',
            '--accent-tertiary': '#58a6ff',  /* B-TERTIARY: Blue */
            '--accent-tertiary-rgb': '88, 166, 255',
            '--border-color': '#30363d',
            '--card-bg': 'rgba(22, 27, 34, 0.85)',
            '--card-border': '#30363d',
            '--glass-blur': '16px',
            '--shadow-soft': '0 12px 48px rgba(0,0,0,0.5)',
            '--terminal-bg': '#0d1117',
            '--terminal-header': '#161b22',
            '--bg-pattern': 'radial-gradient(circle at 1px 1px, rgba(248, 81, 73, 0.1) 1px, transparent 0)',
            '--grid-color': 'rgba(248, 81, 73, 0.05)',
            '--is-monochrome': '0'
        },
        'mono-light': {
            // Monochrome with Greyscale Accents
            '--bg-primary-color': '#ffffff',
            '--bg-primary-gradient': '#ffffff',
            '--bg-secondary': '#f8f9fa',
            '--text-primary': '#000000',
            '--text-secondary': '#444444',
            '--text-muted': '#666666',
            '--accent-primary': '#333333',   /* Dark Grey */
            '--accent-primary-rgb': '51, 51, 51',
            '--accent-secondary': '#666666', /* Medium Grey */
            '--accent-tertiary': '#999999',  /* Light Grey */
            '--border-color': '#e1e4e8',
            '--card-bg': '#ffffff',
            '--card-border': '#e1e4e8',
            '--glass-blur': '0px',
            '--shadow-soft': '0 4px 12px rgba(0,0,0,0.05)',
            '--terminal-bg': '#ffffff',
            '--terminal-header': '#f4f4f4',
            '--bg-pattern': 'none',
            '--grid-color': 'rgba(0, 0, 0, 0.05)',
            '--is-monochrome': '1'
        },
        'mono-dark': {
            // Monochrome with Greyscale Accents
            '--bg-primary-color': '#000000',
            '--bg-primary-gradient': '#000000',
            '--bg-secondary': '#0a0a0a',
            '--text-primary': '#ffffff',
            '--text-secondary': '#cccccc',
            '--text-muted': '#888888',
            '--accent-primary': '#e0e0e0',   /* Light Grey */
            '--accent-primary-rgb': '224, 224, 224',
            '--accent-secondary': '#a0a0a0', /* Medium Grey */
            '--accent-tertiary': '#606060',  /* Dark Grey */
            '--border-color': '#333333',
            '--card-bg': '#000000',
            '--card-border': '#333333',
            '--glass-blur': '0px',
            '--shadow-soft': 'none',
            '--terminal-bg': '#000000',
            '--terminal-header': '#111111',
            '--bg-pattern': 'none',
            '--grid-color': 'rgba(255, 255, 255, 0.08)',
            '--is-monochrome': '1'
        }
    };

    // Apply CSS Variables and Data Attribute
    useEffect(() => {
        const root = document.documentElement;
        const currentTheme = themes[theme];

        // Set data-theme attribute for CSS selectors
        root.setAttribute('data-theme', theme);

        if (currentTheme) {
            Object.entries(currentTheme).forEach(([key, value]) => {
                root.style.setProperty(key, value);
            });

            document.body.style.backgroundColor = currentTheme['--bg-primary-color'];
            document.body.style.color = currentTheme['--text-primary'];
        }

    }, [theme]);

    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme,
            mode,
            setMode,
            dynamicThemeEnabled,
            setDynamicThemeEnabled
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
