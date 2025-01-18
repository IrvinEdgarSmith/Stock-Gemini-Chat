import React from 'react';
    import styles from '../index.module.css';

    interface SidebarProps {
      selectedConversation: string | null;
      onSelectConversation: (id: string) => void;
    }

    const mockConversations = [
      { id: '1', title: 'Project Discussion', lastMessage: 'Sounds good!', timestamp: '10:30 AM' },
      { id: '2', title: 'AI Research', lastMessage: 'Here are the findings...', timestamp: 'Yesterday' },
      { id: '3', title: 'UI Design', lastMessage: 'What do you think?', timestamp: '2 days ago' },
    ];

    const Sidebar: React.FC<SidebarProps> = ({ selectedConversation, onSelectConversation }) => {
      return (
        <aside className={styles.sidebar}>
          <div className={styles['sidebar-header']}>
            <h2>Conversations</h2>
          </div>
          <ul className={styles['conversation-list']}>
            {mockConversations.map((conv) => (
              <li
                key={conv.id}
                className={`${styles['conversation-item']} ${
                  selectedConversation === conv.id ? styles.selected : ''
                }`}
                onClick={() => onSelectConversation(conv.id)}
                aria-selected={selectedConversation === conv.id}
                role="option"
              >
                <div className={styles['conversation-title']}>{conv.title}</div>
                <div className={styles['conversation-details']}>
                  <span>{conv.lastMessage}</span>
                  <span>{conv.timestamp}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      );
    };

    export default Sidebar;
