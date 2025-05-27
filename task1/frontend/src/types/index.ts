import type { ReactNode } from "react";

export interface ButtonProps {
    active: boolean;
    onClick: () => void;
    children: ReactNode;
}

interface Message {
    sender: 'user' | 'system';
    text: string;
    timestamp: string;
}

export interface Conversation {
    id: string;
    ip: string;
    lastMessageTime: string;
    channel: 'webchat' | 'teams';
    region: 'Asia' | 'Europe' | 'America';
    starred: boolean;
    blocked: boolean;
    messages: Message[];
}

export interface ConversationItemProps {
    conversation: Conversation;
    isActive: boolean;
    onClick: () => void;
}