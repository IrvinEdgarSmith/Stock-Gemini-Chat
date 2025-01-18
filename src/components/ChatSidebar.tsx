import React, { useState } from 'react';
    import { FiSearch, FiPlus } from 'react-icons/fi';

    interface Chat {
      id: string;
      title: string;
      lastMessage: string;
      timestamp: string;
    }

    interface ChatSidebarProps {
      selectedChat: string | null;
      onSelectChat: (id: string) => void;
    }

    const ChatSidebar: React.FC<ChatSidebarProps> = ({ selectedChat, onSelectChat }) => {
      const [chats, setChats] = useState<Chat[]>([
        { id: '1', title: 'Project Discussion', lastMessage: 'Sounds good!', timestamp: '10:30 AM' },
        { id: '2', title: 'AI Research', lastMessage: 'Here are the findings...', timestamp: 'Yesterday' },
      ]);
      const [searchQuery, setSearchQuery] = useState('');

      const handleCreateChat = () => {
        const newChat: Chat = {
          id: Date.now().toString(),
          title: `New Chat ${chats.length + 1}`,
          lastMessage: '',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChats([newChat, ...chats]);
        onSelectChat(newChat.id);
      };

      const filteredChats = chats.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return (
        <div className="w-1/4 bg-surface border-r border-divider flex flex-col">
          <div className="p-4 border-b border-divider">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Chats</h2>
              <button
                onClick={handleCreateChat}
                className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                aria-label="Create new chat"
              >
                <FiPlus className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <FiSearch className="absolute left-3 top-2.5 text-text-secondary" />
            </div>
          </div>
          <div className="overflow-y-auto scrollbar-hide flex-1">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`p-4 hover:bg-background/50 cursor-pointer transition-colors ${
                  selectedChat === chat.id ? 'bg-background/50' : ''
                }`}
              >
                <div className="font-medium">{chat.title}</div>
                {chat.lastMessage && (
                  <div className="text-sm text-text-secondary truncate">{chat.lastMessage}</div>
                )}
                <div className="text-xs text-text-secondary mt-1">{chat.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    export default ChatSidebar;
