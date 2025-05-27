import { LuFilter, LuSearch } from "react-icons/lu";
import ThemeToggle from "../ui/ThemeToggle";
import React from "react";

interface HeaderProps {
    searchQuery: string;
    getActiveFilterCount: () => number;
    setIsFilterModalOpen: (open: boolean) => void;
    setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
    searchQuery,
    getActiveFilterCount,
    setIsFilterModalOpen,
    setSearchQuery,
}) => {
    return (<div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Turabit Conversations
            </h2>
            <div className="flex items-center space-x-2">
                <ThemeToggle />
                <div className="relative">
                    <button
                        onClick={() => setIsFilterModalOpen(true)}
                        className="p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    >
                        <LuFilter className="h-4 w-4" />
                    </button>
                    {getActiveFilterCount() > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                            {getActiveFilterCount()}
                        </span>
                    )}
                </div>
            </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
                type="text"
                placeholder="Search by IP address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
            />
        </div>

    </div>)
}

export default Header;