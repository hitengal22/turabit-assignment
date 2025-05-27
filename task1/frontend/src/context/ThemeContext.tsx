import { createContext, useState, type ReactNode } from 'react';
type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme?: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>({
    theme: 'light'
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev == undefined || prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext>
  );
};

