import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Default theme is 'rgb' (Matrix) as requested
    const [theme, setTheme] = useState('rgb');
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
            'matrix': 'rgb',
            'rgb': 'rgb',
            'noir': 'monochrome',
            'monochrome': 'monochrome'
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
            '--bg-primary-color': '#f5f7fa',
            '--bg-primary-gradient': 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 50%, #dfe4eb 100%)',
            '--bg-secondary': '#eef2f7',
            '--text-primary': '#1a1d23',
            '--text-secondary': '#4a5568',
            '--accent-primary': '#5a78af',
            '--accent-primary-rgb': '90, 120, 175',
            '--accent-secondary': '#e2a285',
            '--border-color': 'rgba(0, 0, 0, 0.08)',
            '--card-bg': 'rgba(255, 255, 255, 0.75)',
            '--card-border': 'rgba(0, 0, 0, 0.06)',
            '--glass-blur': '16px',
            '--shadow-soft': '0 8px 32px rgba(0, 0, 0, 0.06)',
            '--terminal-bg': '#ffffff',
            '--terminal-header': '#f1f3f5',
            '--bg-pattern': 'radial-gradient(circle at 1px 1px, rgba(90, 120, 175, 0.08) 1px, transparent 0)',
            '--grid-color': 'rgba(90, 120, 175, 0.04)',
            '--is-monochrome': '0'
        },
        dusk: {
            '--bg-primary-color': '#1a1a1c',
            '--bg-primary-gradient': 'linear-gradient(135deg, #232326 0%, #1a1a1c 100%)',
            '--bg-secondary': '#2b2b2f',
            '--text-primary': '#cbd5e0',
            '--text-secondary': '#a0aec0',
            '--accent-primary': '#cc8a8a',
            '--accent-primary-rgb': '204, 138, 138',
            '--accent-secondary': '#a399b2',
            '--border-color': 'rgba(255, 255, 255, 0.06)',
            '--card-bg': 'rgba(43, 43, 47, 0.75)',
            '--card-border': 'rgba(255, 255, 255, 0.03)',
            '--glass-blur': '16px',
            '--shadow-soft': '0 12px 48px rgba(0,0,0,0.25)',
            '--terminal-bg': '#1a1a1c',
            '--terminal-header': '#232326',
            '--bg-pattern': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.015) 1px, transparent 0)',
            '--grid-color': 'rgba(255,255,255,0.015)',
            '--is-monochrome': '0'
        },
        rgb: {
            // STRICTLY 3 COLORS: Green, Blue, Amber
            '--bg-primary-color': '#000000',
            '--bg-primary-gradient': '#000000',
            '--bg-secondary': '#050505',
            '--text-primary': '#ffffff',
            '--text-secondary': '#949494',
            '--text-muted': '#555555',
            '--accent-primary': '#3fb950',   /* 1. Primary: Green */
            '--accent-primary-rgb': '63, 185, 80',
            '--accent-secondary': '#3f52fd', /* 2. Secondary: Blue */
            '--accent-tertiary': '#ff4b4b',  /* 3. Tertiary: Red */
            '--border-color': '#21262d',
            '--card-bg': 'rgba(1, 4, 9, 0.85)',
            '--card-border': '#30363d',
            '--glass-blur': '20px',
            '--shadow-soft': '0 10px 40px rgba(0,0,0,0.95)',
            '--terminal-bg': '#000000',
            '--terminal-header': '#161b22',
            '--bg-pattern': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
            '--grid-color': 'rgba(255, 255, 255, 0.035)',
            '--is-monochrome': '0',
            '--is-rgb': '1'
        },
        monochrome: {
            // STRICTLY 3 COLORS: White, Black, Gray
            '--bg-primary-color': '#000000',
            '--bg-primary-gradient': '#000000',
            '--bg-secondary': '#080808',
            '--text-primary': '#ffffff',
            '--text-secondary': '#a0a0a0', // Light Gray
            '--text-muted': '#666666',      // Medium Gray
            '--accent-primary': '#ffffff',  // White Strips
            '--accent-primary-rgb': '255, 255, 255',
            '--accent-secondary': '#888888', // Industrial Gray
            '--accent-tertiary': '#444444',  // Dark Gray markers
            '--border-color': '#222222',
            '--card-bg': 'rgba(8, 8, 8, 0.95)',
            '--card-border': '#333333',
            '--glass-blur': '20px',
            '--shadow-soft': '0 10px 40px rgba(0,0,0,0.95)',
            '--terminal-bg': '#000000',
            '--terminal-header': '#111111',
            '--bg-pattern': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)',
            '--grid-color': 'rgba(255,255,255,0.015)',
            '--is-monochrome': '1',
            '--is-rgb': '0'
        }
    };

    // Apply CSS Variables
    useEffect(() => {
        const root = document.documentElement;
        const currentTheme = themes[theme];

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
