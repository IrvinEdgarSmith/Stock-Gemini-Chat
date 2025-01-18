import React, { useState, useEffect, useRef } from 'react'; // Add useEffect import
    import { FiSend, FiTrash2, FiAlertCircle } from 'react-icons/fi';
    import Markdown from 'react-markdown';
    import remarkGfm from 'remark-gfm';

    interface Message {
      id: string;
      text: string;
      sender: 'user' | 'ai';
      timestamp: string;
      status: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
    }

    interface ChatWindowProps {
      chatId: string;
      messages: Message[];
      onNewMessage: (message: Message) => void;
      onClearChat: () => void;
      isLoading: boolean;
      error: string | null;
    }

    const ChatWindow: React.FC<ChatWindowProps> = ({ 
      chatId, 
      messages, 
      onNewMessage, 
      onClearChat, 
      isLoading, 
      error 
    }) => {
      const [inputValue, setInputValue] = useState('');
      const inputRef = useRef<HTMLTextAreaElement>(null);

      // Focus input when chat changes
      useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, [chatId]);

      const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
          id: Date.now().toString(),
          text: inputValue,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString(),
          status: 'sending'
        };

        onNewMessage(newMessage);
        setInputValue('');
      };

      const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      };

      return (
        <div className="flex-1 flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-divider">
            <h2 className="text-lg font-semibold">Chat {chatId}</h2>
            <button
              onClick={onClearChat}
              className="p-2 hover:bg-background/50 rounded-lg"
              aria-label="Clear chat"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-accent/10 text-accent p-4 border-b border-accent/20">
              <FiAlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                } mb-4`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-surface border border-divider'
                  }`}
                >
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {message.text}
                  </Markdown>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-xs opacity-75">
                      {message.timestamp}
                    </div>
                    {message.sender === 'user' && (
                      <div className="text-xs ml-2">
                        {message.status === 'sending' && '🕒'}
                        {message.status === 'sent' && '✓'}
                        {message.status === 'delivered' && '✓✓'}
                        {message.status === 'read' && '👁'}
                        {message.status === 'error' && '❌'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface border border-divider p-3 rounded-lg animate-typing">
                  AI is typing...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-divider">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 p-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                aria-label="Message input"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                aria-label="Send message"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      );
    };

    export default ChatWindow;
