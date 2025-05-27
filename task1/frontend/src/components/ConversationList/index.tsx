import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { LuSearch } from "react-icons/lu";
import Button from "../ui/Button";
import type { FilterType } from "../../types/chat-list";
import type { Conversation } from "../../types";
import ConversationItem from "./ConversationItem";

export default function ConversationList() {
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("");
    const [activeFilters, setActiveFilters] = useState<Set<FilterType>>(new Set());
    const [searchQuery, setSearchQuery] = useState<string>('');
    const toggleFilterPopup = () => setIsFilterPopupOpen(!isFilterPopupOpen);
    const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([]);
    const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
    
    const filters = [
        { id: "starred", label: "Starred conversations" },
        { id: "blocked", label: "Blocked IPs" },
        { id: "date-range", label: "Date range" },
        { id: "region", label: "Region" },
        { id: "channel", label: "Channel" },
    ];

    const toggleFilter = (filter: FilterType): void => {
        const newFilters = new Set(activeFilters);
        if (newFilters.has(filter)) {
            newFilters.delete(filter);
        } else {
            newFilters.add(filter);
        }
        setActiveFilters(newFilters);
    };

    return (
        <div className="w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Recent Conversations
                    </h2>
                    {/* <ThemeToggle /> */}
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

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                    <Button
                        active={activeFilters.has('starred')}
                        onClick={() => toggleFilter('starred')}
                    >
                        ⭐ Starred
                    </Button>
                    <Button
                        active={activeFilters.has('blocked')}
                        onClick={() => toggleFilter('blocked')}
                    >
                        🚫 Blocked
                    </Button>
                    <Button
                        active={activeFilters.has('webchat')}
                        onClick={() => toggleFilter('webchat')}
                    >
                        💬 Webchat
                    </Button>
                    <Button
                        active={activeFilters.has('teams')}
                        onClick={() => toggleFilter('teams')}
                    >
                        📺 Teams
                    </Button>
                    <Button
                        active={activeFilters.has('today')}
                        onClick={() => toggleFilter('today')}
                    >
                        📅 Today
                    </Button>
                </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {filteredConversations.map(conv => (
                    <ConversationItem
                        key={conv.id}
                        conversation={conv}
                        isActive={currentConversation?.id === conv.id}
                        onClick={() => setCurrentConversation(conv)}
                    />
                ))}
                {filteredConversations.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No conversations found
                    </div>
                )}
            </div>
        </div>
    );
}