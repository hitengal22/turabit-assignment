import type { ReactNode, MouseEventHandler } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
    children: ReactNode;
    active?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
}

const Button = ({
    children,
    active = false,
    onClick,
    variant = "secondary",
    size = "sm",
    className = "",
}: ButtonProps) => {
    const baseClasses =
        "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary:
            "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400",
        secondary: active
            ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/30"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600",
        ghost:
            "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm rounded-md",
        md: "px-4 py-2 text-sm rounded-md",
        lg: "px-6 py-3 text-base rounded-lg",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;