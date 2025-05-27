import type { DateSeparatorProps } from "../../types";
import { formatDate } from "../../utility";

const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => (
    <div className="flex items-center justify-center my-6">
        <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
        <div className="px-4 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-full">
            {formatDate(date)}
        </div>
        <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
    </div>
);

export default DateSeparator