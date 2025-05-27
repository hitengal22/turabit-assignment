import { LuMessageCircle } from "react-icons/lu"

const NoRecords = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            <LuMessageCircle className="h-16 w-16 mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">Select a conversation to view messages</h3>
            <p className="text-center">Choose a conversation from the left panel to see the message history</p>
        </div>
    )
}

export default NoRecords;