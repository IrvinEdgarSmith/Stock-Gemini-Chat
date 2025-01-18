import React, { useState } from 'react';
    import { CSSTransition, TransitionGroup } from 'react-transition-group';
    import styles from '../index.module.css';

    interface Message {
      id: string;
      text: string;
      sender: 'user' | 'ai';
      timestamp: string;
    }

    interface ChatAreaProps {
      conversationId: string | null;
    }

    const mockMessages: Message[] = [
      { id: '1', text: 'Hello!', sender: 'user', timestamp: '10:30 AM' },
      { id: '2', text: 'Hi there! How can I assist you today?', sender: 'ai', timestamp: '10:31 AM' },
    ];

    const ChatArea: React.FC<ChatAreaProps> = ({ conversationId }) => {
      const [messages, setMessages] = useState<Message[]>(mockMessages);
      const [inputValue, setInputValue] = useState('');

      const handleSend = () => {
        if (inputValue.trim()) {
          const newMessage: Message = {
            id: String(Date.now()),
            text: inputValue,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages([...messages, newMessage]);
          setInputValue('');
          
          // Mock AI response
          setTimeout(() => {
            const aiResponse: Message = {
              id: String(Date.now()),
              text: 'This is a mock AI response.',
              sender: 'ai',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, aiResponse]);
          }, 1000);
        }
      };

      return (
        <main className={styles['chat-area']}>
          <div className={styles['messages-container']}>
            <TransitionGroup component={null}>
              {messages.map((message) => (
                <CSSTransition
                  key={message.id}
                  timeout={300}
                  classNames="message"
                >
                  <div
                    className={`${styles.message} ${
                      message.sender === 'user' ? styles.user : styles.ai
                    }`}
                    role="log"
                    aria-live="polite"
                  >
                    <div className={styles['message-content']}>
                      {message.text}
                      <span className={styles.timestamp}>{message.timestamp}</span>
                    </div>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
          <div className={styles['input-container']}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              aria-label="Message input"
            />
            <button onClick={handleSend} aria-label="Send message">
              Send
            </button>
          </div>
        </main>
      );
    };

    export default ChatArea;
