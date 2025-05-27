import type { Message } from "../types";

export const formatTimestamp = (timestamp?: string): string => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
};

export const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const groupMessagesByDate = (messages: Message[]): Record<string, Message[]> => {
    const groups: Record<string, Message[]> = {};
    messages.forEach(msg => {
        const date = new Date(msg.timestamp).toDateString();
        if (!groups[date]) groups[date] = [];
        groups[date].push(msg);
    });
    return groups;
};