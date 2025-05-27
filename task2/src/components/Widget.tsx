import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import MessageItem from "./MessageItem";
import TypingDelay from "./TypingDelay";
import UserInput from "./UserInput";

// Types
type Message = {
    id: number;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
};

type WidgetProps = {
    setIsOpen: (open: boolean) => void;
    isOpen: boolean;
};

const Widget: React.FC<WidgetProps> = ({ setIsOpen, isOpen }) => {
    const [isMinimized, setIsMinimized] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>(
        [
            {
                id: 1,
                text: "Hello! I'm here to help you. How can I assist you today?",
                sender: 'bot',
                timestamp: new Date()
            }
        ]
    );
    const [inputMessage, setInputMessage] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [hoveredMsgId, setHoveredMsgId] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const simulateBotResponse = () => {
        setIsTyping(true);
        setTimeout(() => {
            const responses = [
                "That's a great question! Let me help you with that.",
                "I understand your concern. Here's what I can suggest...",
                "Thanks for reaching out! I'd be happy to assist you.",
                "Let me provide you with some helpful information about that.",
                "I see what you're looking for. Here are some options...",
                "That's an interesting point. Let me elaborate on that for you."
            ];

            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            setMessages(prev => [...prev, {
                id: Date.now(),
                text: randomResponse,
                sender: 'bot',
                timestamp: new Date()
            }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            const userMsg: Message = {
                id: Date.now(),
                text: inputMessage.trim(),
                sender: 'user',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, userMsg]);
            simulateBotResponse();
            setInputMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const filteredMessages = messages.filter(msg =>
        msg.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const resetChat = () => {
        setMessages([
            {
                id: 1,
                text: "Hello! I'm here to help you. How can I assist you today?",
                sender: 'bot',
                timestamp: new Date()
            }
        ]);
        setSearchQuery('');
        setShowSearch(false);
    };

    // Group messages by date (YYYY-MM-DD)
    const groupMessagesByDate = (msgs: Message[]) => {
        const groups: { [date: string]: Message[] } = {};
        msgs.forEach(msg => {
            const dateKey = msg.timestamp.toDateString();
            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(msg);
        });
        return groups;
    };

    const groupedMessages = groupMessagesByDate(filteredMessages);


    const formatDate = (date: Date) => {
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}>
            <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 flex flex-col ${isMinimized
                ? 'w-72 sm:w-80 h-14'
                : 'w-80 sm:w-96 h-[28rem] sm:h-[32rem]'
                }`}>

                {/* Header */}
                <Header
                    isMinimized={isMinimized}
                    setIsMinimized={setIsMinimized}
                    setIsOpen={setIsOpen}
                    resetChat={resetChat}
                    showSearch={showSearch}
                    setShowSearch={setShowSearch}
                />

                {!isMinimized && (
                    <>
                        {/* Search Bar */}
                        {showSearch && (
                            <SearchBar
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />
                        )}

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                            {Object.entries(groupedMessages).map(([date, msgs]) => (
                                <div key={date}>
                                    {/* Date Group Label */}
                                    <div className="flex justify-center mb-2">
                                        <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">
                                            {formatDate(msgs[0].timestamp)}
                                        </span>
                                    </div>
                                    {msgs.map((message) => (
                                        <MessageItem
                                            key={message.id}
                                            message={message}
                                            setHoveredMsgId={setHoveredMsgId}
                                            hoveredMsgId={hoveredMsgId}
                                        />
                                    ))}
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && <TypingDelay />}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <UserInput
                            inputMessage={inputMessage}
                            setInputMessage={setInputMessage}
                            handleSendMessage={handleSendMessage}
                            inputRef={inputRef}
                            handleKeyPress={handleKeyPress}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default Widget;