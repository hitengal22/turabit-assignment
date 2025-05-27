import { useEffect, useState } from "react";
import type { ConversationList } from "../../types";
import ConversationItem from "./ConversationItem";
import { Conversations } from "../../data/ConversationList";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { setSelectedConversation } from "../../features/conversation/converstationSlice";
import FilterModal from "./FilterModal";
import Header from "./Header";

export default function ConversationList() {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredConversations, setFilteredConversations] = useState<ConversationList[]>(Conversations);
    const currentConversation = useSelector((state: RootState) => state.conversation.selectedConversation);
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const dispatch = useDispatch();

    const [filters, setFilters] = useState<{
        starred: boolean;
        blocked: boolean;
        dateRange: { from: string; to: string };
        region: Array<ConversationList['region']>;
        channel: Array<ConversationList['channel']>;
    }>({
        starred: false,
        blocked: false,
        dateRange: { from: '', to: '' },
        region: [],
        channel: []
    });

    const handleSelectedConversation = (conv: ConversationList) => {
        dispatch(setSelectedConversation(conv));
    }

    const getActiveFilterCount = () => {
        let count = 0;
        if (filters.starred) count++;
        if (filters.blocked) count++;
        if (filters.dateRange.from && filters.dateRange.to) count++;
        if (filters.region.length > 0) count++;
        if (filters.channel.length > 0) count++;
        return count;
    };

    useEffect(() => {
        let filtered = [...conversations];

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(conv =>
                conv.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
                conv.region.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Starred filter
        if (filters.starred) {
            filtered = filtered.filter(conv => conv.starred);
        }

        // Blocked filter
        if (filters.blocked) {
            filtered = filtered.filter(conv => conv.blocked);
        }

        // Date range filter
        if (filters.dateRange.from && filters.dateRange.to) {
            const fromDate = new Date(filters.dateRange.from);
            const toDate = new Date(filters.dateRange.to);
            filtered = filtered.filter(conv => {
                const convDate = new Date(conv.lastMessageTime);
                return convDate >= fromDate && convDate <= toDate;
            });
        }

        // Region filter
        if (filters.region.length > 0) {
            filtered = filtered.filter(conv => filters.region.includes(conv.region));
        }

        // Channel filter
        if (filters.channel.length > 0) {
            filtered = filtered.filter(conv => filters.channel.includes(conv.channel));
        }

        setFilteredConversations(filtered);
    }, [conversations, searchQuery, filters]);

    return (
        <div className="w-[30%] relative bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            {/* Header */}
            <Header
                searchQuery={searchQuery}
                getActiveFilterCount={getActiveFilterCount}
                setIsFilterModalOpen={setIsFilterModalOpen}
                setSearchQuery={setSearchQuery}
            />

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {filteredConversations.map(conv => (
                    <ConversationItem
                        key={conv.id}
                        conversation={conv}
                        isActive={currentConversation?.id === conv.id}
                        onClick={() => handleSelectedConversation(conv)}
                    />
                ))}
                {filteredConversations.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No conversations found
                    </div>
                )}
            </div>

            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                filters={filters}
                onFiltersChange={setFilters}
                onApply={() => setIsFilterModalOpen(false)}
                onClear={() => {
                    setFilters({
                        starred: false,
                        blocked: false,
                        dateRange: { from: '', to: '' },
                        region: [],
                        channel: []
                    });
                    setIsFilterModalOpen(false);
                }}
            />
        </div>
    );
}