import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'atelier' | 'obsidian' | 'nordic';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'atelier',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('vb-portfolio-theme') as ThemeMode;
    return saved || 'atelier';
  });

  useEffect(() => {
    localStorage.setItem('vb-portfolio-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Manage root class
    document.documentElement.classList.remove('theme-atelier', 'theme-obsidian', 'theme-nordic');
    document.documentElement.classList.add(`theme-${theme}`);
    
    if (theme === 'obsidian') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
