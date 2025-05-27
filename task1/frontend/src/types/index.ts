import type { ReactNode } from "react";

export interface ButtonProps {
    active: boolean;
    onClick: () => void;
    children: ReactNode;
}

export interface Message {
    sender: 'user' | 'system';
    text: string;
    timestamp: string;
}

export interface MessageProps {
  message: Message;
}

export interface DateSeparatorProps {
  date: string;
}

export interface ConversationList {
    id: string;
    ip: string;
    lastMessageTime: string;
    channel: 'webchat' | 'teams';
    region: 'Asia' | 'Europe' | 'America';
    starred: boolean;
    blocked: boolean;
}

export interface Conversation {
    [key: string]: Message[];
}

export interface ConversationItemProps {
    conversation: ConversationList;
    isActive: boolean;
    onClick: () => void;
}

export interface ConversationSliceState {
    conversations: ConversationList[];
    conversationMessages: Conversation;
    selectedConversation: ConversationList | null;
    selectedConversationMessages: Message[];
}