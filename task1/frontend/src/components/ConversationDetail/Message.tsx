import type { MessageProps } from "../../types";
import { formatTime } from "../../utility";

const Message: React.FC<MessageProps> = ({ message }) => {
    const isUser = message.sender === 'user';

    return (
        <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isUser
                        ? 'bg-blue-500 text-white rounded-br-sm dark:bg-blue-600'
                        : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm dark:bg-gray-700 dark:text-white dark:border-gray-600'
                    }`}
            >
                <div className="text-sm">{message.text}</div>
                <div
                    className={`text-xs mt-1 ${isUser
                            ? 'text-blue-100 dark:text-blue-200'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                >
                    {formatTime(message.timestamp)}
                </div>
            </div>
        </div>
    );
};

export default Message