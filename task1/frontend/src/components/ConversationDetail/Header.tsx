import { formatTimestamp } from "../../utility";

const Header = ({ ip, timestamp }: { ip?: string, timestamp?: string }) => {
    return (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {ip}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Last active: {formatTimestamp(timestamp)}
                </p>
            </div>
        </div>
    )
}


export default Header;