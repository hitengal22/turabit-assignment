import { Bot, Maximize2, Minimize2, RotateCcw, Search, X } from "lucide-react";

type HeaderProps = {
    isMinimized: boolean;
    setIsMinimized: (val: boolean) => void;
    setIsOpen: (val: boolean) => void;
    resetChat: () => void;
    showSearch: boolean;
    setShowSearch: (val: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({
    isMinimized,
    setIsMinimized,
    setIsOpen,
    resetChat,
    showSearch,
    setShowSearch
}) => {
    return (
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-3 sm:p-4 flex items-center justify-between min-h-[3.5rem]">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="sm:w-4 sm:h-4" />
                </div>
                {!isMinimized && (
                    <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm truncate">AI Assistant</h3>
                        <p className="text-xs text-blue-100 truncate">Online • Typically replies in minutes</p>
                    </div>
                )}
                {isMinimized && (
                    <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm truncate">AI Assistant</h3>
                    </div>
                )}
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0">
                {!isMinimized && (
                    <>
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
                            title="Search messages"
                        >
                            <Search size={14} className="sm:w-4 sm:h-4" />
                        </button>
                        <button
                            onClick={resetChat}
                            className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
                            title="Reset chat"
                        >
                            <RotateCcw size={14} className="sm:w-4 sm:h-4" />
                        </button>
                    </>
                )}
                <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title={isMinimized ? "Maximize" : "Minimize"}
                >
                    {isMinimized ? <Maximize2 size={14} className="sm:w-4 sm:h-4" /> : <Minimize2 size={14} className="sm:w-4 sm:h-4" />}
                </button>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Close chat"
                >
                    <X size={14} className="sm:w-4 sm:h-4" />
                </button>
            </div>
        </div>
    )
}

export default Header;