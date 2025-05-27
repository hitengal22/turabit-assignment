import type { ButtonProps } from "../../types";

const Button: React.FC<ButtonProps> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1.5 text-sm rounded-md border transition-all duration-200 ${active
                ? 'bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
            }`}
    >
        {children}
    </button>
);

export default Button;