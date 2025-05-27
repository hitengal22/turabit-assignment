import { LuBan, LuStar } from "react-icons/lu";
import type { ConversationItemProps } from "../../types";
import { formatTimestamp } from "../../utility";

// Conversation Item Component
const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, isActive, onClick }) => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    const preview = lastMessage ? lastMessage.text.substring(0, 50) + '...' : '';
  
    return (
      <div
        onClick={onClick}
        className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
          isActive
            ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
            : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          {conversation.starred && <LuStar className="h-4 w-4 text-yellow-500 fill-current" />}
          {conversation.blocked && <LuBan className="h-4 w-4 text-red-500" />}
          <span className="font-medium text-gray-900 dark:text-white text-sm">
            {conversation.ip}
          </span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {formatTimestamp(conversation.lastMessageTime)}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {preview}
        </div>
      </div>
    );
  };

  export default ConversationItem;