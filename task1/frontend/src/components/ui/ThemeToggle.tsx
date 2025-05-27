import { use } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const themeContext = use(ThemeContext);

  if (!themeContext) return null;

  const { toggleTheme, theme } = themeContext;

  return (
    <button
      onClick={() => toggleTheme && toggleTheme()}
      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
      title={`Switch to ${theme == 'dark' ? 'light' : 'dark'} mode`}
    >
    {theme && theme == 'light' ? (
        <LuSun className="h-5 w-5 text-yellow-500" />
      ) : (
        <LuMoon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );
};

export default ThemeToggle;