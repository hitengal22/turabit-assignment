import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

export const useDarkMode = (): (boolean | Dispatch<SetStateAction<boolean>>)[] => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
};
