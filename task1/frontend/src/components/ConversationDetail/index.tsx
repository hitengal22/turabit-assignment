import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { groupMessagesByDate } from "../../utility";
import React from "react";
import DateSeparator from "./DateSeparator";
import Message from "./Message";
import NoRecords from "./NoRecords";
import Header from "./Header";


export default function ConversationDetail() {
    const messages = useSelector((state: RootState) => state.conversation.selectedConversationMessages);
    const currentConversation = useSelector((state: RootState) => state.conversation.selectedConversation);
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
    return (
        <div className="w-[70%] flx-1 flex flex-col">
            {messages.length ? (
                <>
                    <Header ip={currentConversation?.ip} timestamp={lastMessage?.timestamp} />

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
                        {Object.entries(groupMessagesByDate(messages)).map(([date, messages]) => (
                            <React.Fragment key={date}>
                                <DateSeparator date={date} />
                                {messages.map((message, index) => (
                                    <Message key={index} message={message} />
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </>
            ) : (
                <NoRecords />
            )}
        </div>

    )
}