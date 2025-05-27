import { Bot, User } from "lucide-react"
import { formatTime } from "../utility"
import React from "react";

interface Message {
    id: number;
    sender: "user" | "bot";
    text: string;
    timestamp: Date;
}

interface MessageItemProps {
    message: Message;
    setHoveredMsgId: (id: number | null) => void;
    hoveredMsgId: string | number | null;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, setHoveredMsgId, hoveredMsgId }) => {
    return (
        <div
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} group mb-3`}
            onMouseEnter={() => setHoveredMsgId(message.id)}
            onMouseLeave={() => setHoveredMsgId(null)}
        >
            <div className={`flex items-start space-x-2 max-w-[85%] sm:max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${message.sender === 'user'
                    ? 'bg-gradient-to-r from-primary to-secondary'
                    : 'bg-gradient-to-r from-gray-500 to-gray-600'
                    }`}>
                    {message.sender === 'user' ? <User size={12} className="sm:w-3.5 sm:h-3.5" /> : <Bot size={12} className="sm:w-3.5 sm:h-3.5" />}
                </div>
                <div className={`relative rounded-2xl px-3 py-2 text-xs sm:text-sm transition-all duration-200
                                                    ${message.sender === 'user'
                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }
                                                    ${hoveredMsgId === message.id ? 'mt-5' : 'mt-0'}
                                                `}>
                    {/* Time string above bubble, only on hover */}
                    <div
                        className={`absolute left-1/8 -translate-x-1/2 top-[-22px] text-[11px] bg-transparent text-gray-500 opacity-0 transition-all duration-200 pointer-events-none
                                                        ${hoveredMsgId === message.id ? 'opacity-100 pointer-events-auto' : ''}
                                                        `}
                        style={{ whiteSpace: 'nowrap', zIndex: 10 }}
                    >
                        {formatTime(message.timestamp)}
                    </div>
                    <p className="break-words">{message.text}</p>
                </div>
            </div>
        </div>
    )
}

export default MessageItem;