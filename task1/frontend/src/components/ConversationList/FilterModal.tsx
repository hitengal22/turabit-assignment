import { LuCalendar, LuFilter, LuMapPin, LuMessageSquare, LuShield, LuStar, LuX } from "react-icons/lu";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import type { ConversationList } from "../../types";

export interface FiltersState {
    starred: boolean;
    blocked: boolean;
    dateRange: { from: string; to: string };
    region: Array<ConversationList['region']>;
    channel: Array<ConversationList['channel']>;
}

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    filters: FiltersState;
    onFiltersChange: (filters: FiltersState) => void;
    onApply: () => void;
    onClear: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
    isOpen,
    onClose,
    filters,
    onFiltersChange,
    onApply,
    onClear,
}) => {
    const [localFilters, setLocalFilters] = useState<FiltersState>(filters);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleLocalFilterChange = (key: keyof FiltersState, value: any) => {
        setLocalFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleApply = () => {
        onFiltersChange(localFilters);
        onApply();
        onClose();
    };

    const handleClear = () => {
        const clearedFilters: FiltersState = {
            starred: false,
            blocked: false,
            dateRange: { from: '', to: '' },
            region: [],
            channel: []
        };
        setLocalFilters(clearedFilters);
        onFiltersChange(clearedFilters);
        onClear();
    };

    const regions: {
        value: ConversationList['region'];
        label: string;
    }[] = [
            { value: 'Asia', label: 'Asia' },
            { value: 'Europe', label: 'Europe' },
            { value: 'America', label: 'America' },
        ];

    const channels: {
        value: ConversationList['channel'];
        label: string;
    }[] = [
            { value: 'webchat', label: 'Webchat' },
            { value: 'teams', label: 'MS Teams' }
        ];

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 dark:bg-black/70 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={`
                    fixed inset-y-0 left-0 w-4/5 max-w-md bg-white dark:bg-gray-800 shadow-xl z-50
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <LuFilter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Filter Conversations
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                        >
                            <LuX className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Quick Filters */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                Quick Filters
                            </h3>
                            <div className="space-y-3">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={localFilters.starred}
                                        onChange={(e) => handleLocalFilterChange('starred', e.target.checked)}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                    />
                                    <div className="ml-3 flex items-center gap-2">
                                        <LuStar className="h-4 w-4 text-yellow-500" />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            Starred conversations
                                        </span>
                                    </div>
                                </label>

                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={localFilters.blocked}
                                        onChange={(e) => handleLocalFilterChange('blocked', e.target.checked)}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                    />
                                    <div className="ml-3 flex items-center gap-2">
                                        <LuShield className="h-4 w-4 text-red-500" />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            Blocked IPs
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Date Range */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <LuCalendar className="h-4 w-4" />
                                Date Range
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                                        From
                                    </label>
                                    <input
                                        type="date"
                                        value={localFilters.dateRange.from}
                                        onChange={(e) => handleLocalFilterChange('dateRange', {
                                            ...localFilters.dateRange,
                                            from: e.target.value
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                                        To
                                    </label>
                                    <input
                                        type="date"
                                        value={localFilters.dateRange.to}
                                        onChange={(e) => handleLocalFilterChange('dateRange', {
                                            ...localFilters.dateRange,
                                            to: e.target.value
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Region */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <LuMapPin className="h-4 w-4" />
                                Region
                            </h3>
                            <div className="space-y-2">
                                {regions.map((region) => (
                                    <label key={region.value} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={localFilters.region.includes(region.value)}
                                            onChange={(e) => {
                                                const newRegions = e.target.checked
                                                    ? [...localFilters.region, region.value]
                                                    : localFilters.region.filter(r => r !== region.value);
                                                handleLocalFilterChange('region', newRegions);
                                            }}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                        />
                                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                                            {region.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Channel */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <LuMessageSquare className="h-4 w-4" />
                                Channel
                            </h3>
                            <div className="space-y-2">
                                {channels.map((channel) => (
                                    <label key={channel.value} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={localFilters.channel.includes(channel.value)}
                                            onChange={(e) => {
                                                const newChannels = e.target.checked
                                                    ? [...localFilters.channel, channel.value]
                                                    : localFilters.channel.filter(c => c !== channel.value);
                                                handleLocalFilterChange('channel', newChannels);
                                            }}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                        />
                                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                                            {channel.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <div className="flex gap-3">
                            <Button
                                variant="ghost"
                                size="md"
                                onClick={handleClear}
                                className="flex-1"
                            >
                                Clear All
                            </Button>
                            <Button
                                variant="primary"
                                size="md"
                                onClick={handleApply}
                                className="flex-1"
                            >
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterModal;