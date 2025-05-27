import { LuBan, LuMapPin, LuShield, LuStar } from "react-icons/lu";
import type { ConversationItemProps } from "../../types";
import { formatTime, formatTimestamp } from "../../utility";
import { ConversationMessages } from "../../data/ConversationMessages";

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, isActive, onClick }) => {
  const messages = ConversationMessages[conversation.id] || [];
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
  const preview = lastMessage ? lastMessage.text.substring(0, 50) + '...' : '';

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer transition-colors border ${isActive
          ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
          : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
        }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
            {conversation.ip}
          </span>
          {conversation.starred && (
            <LuStar className="h-4 w-4 text-yellow-500 fill-current" />
          )}
          {conversation.blocked && (
            <LuShield className="h-4 w-4 text-red-500" />
          )}
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatTime(conversation.lastMessageTime)}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <LuMapPin className="h-3 w-3 text-gray-400" />
        <span className="text-xs text-gray-600 dark:text-gray-400">
          {conversation.region}
        </span>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${conversation.channel === 'webchat'
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            : 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
          }`}>
          {conversation.channel === 'webchat' ? 'Web' : 'Teams'}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {preview || 'No messages yet'}
      </p>
    </div>
  );
};

export default ConversationItem;