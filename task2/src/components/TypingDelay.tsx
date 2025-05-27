import { Bot } from "lucide-react"

const TypingDelay = () => {
    return (
        <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[85%] sm:max-w-xs">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center text-white flex-shrink-0">
                    <Bot size={12} className="sm:w-3.5 sm:h-3.5" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-3 py-2">
                    <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TypingDelay;