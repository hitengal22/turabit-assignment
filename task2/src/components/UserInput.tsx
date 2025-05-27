import { Send } from "lucide-react";
import React, { type RefObject } from "react";
interface UserInputProps {
    inputMessage: string;
    setInputMessage: (msg: string) => void;
    handleSendMessage: () => void;
    inputRef: RefObject<HTMLTextAreaElement | null>;
    handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const UserInput: React.FC<UserInputProps> = ({
    inputMessage,
    setInputMessage,
    handleSendMessage,
    inputRef,
    handleKeyPress
}) => {
    return (
        <div className="border-t border-gray-200 p-3 sm:p-4">
            <div className="flex items-center space-x-2">
                <div className="flex-1">
                    <textarea
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-xs sm:text-sm"
                        rows={1}
                        style={{ minHeight: '36px', maxHeight: '80px' }}
                    />
                </div>
                <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-gradient-to-r from-primary to-secondary text-white p-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex-shrink-0"
                >
                    <Send size={16} className="sm:w-4.5 sm:h-4.5" />
                </button>
            </div>
        </div>
    );
};

export default UserInput;