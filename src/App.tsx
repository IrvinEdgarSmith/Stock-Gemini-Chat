import React, { useState, useEffect } from 'react';
    import ChatSidebar from './components/ChatSidebar';
    import ChatWindow from './components/ChatWindow';
    import SettingsModal from './components/SettingsModal';

    interface Message {
      id: string;
      text: string;
      sender: 'user' | 'ai';
      timestamp: string;
      status: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
    }

    interface ChatHistory {
      [key: string]: {
        messages: Message[];
        isLoading: boolean;
        error: string | null;
      };
    }

    const App: React.FC = () => {
      const [selectedChat, setSelectedChat] = useState<string | null>(null);
      const [chatHistory, setChatHistory] = useState<ChatHistory>({});
      const [apiKey, setApiKey] = useState('');
      const [selectedModel, setSelectedModel] = useState('');

      // Load saved settings on initial render
      useEffect(() => {
        const storedKey = localStorage.getItem('geminiApiKey');
        const storedModel = localStorage.getItem('selectedModel');
        
        if (storedKey) {
          setApiKey(storedKey);
        }
        if (storedModel) {
          setSelectedModel(storedModel);
        }
      }, []);

      const handleSelectChat = (chatId: string) => {
        setSelectedChat(chatId);
        if (!chatHistory[chatId]) {
          setChatHistory(prev => ({
            ...prev,
            [chatId]: { 
              messages: [],
              isLoading: false,
              error: null
            }
          }));
        }
      };

      const handleNewMessage = async (message: Message) => {
        if (!selectedChat) return;

        // Add user message immediately
        setChatHistory(prev => ({
          ...prev,
          [selectedChat]: {
            ...prev[selectedChat],
            messages: [...(prev[selectedChat]?.messages || []), message],
            isLoading: true,
            error: null
          }
        }));

        try {
          if (!apiKey) throw new Error('API key is required');
          if (!selectedModel) throw new Error('Model is required');

          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/${selectedModel}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                contents: [{
                  role: 'user',
                  parts: [{ text: message.text }]
                }],
                safetySettings: [
                  {
                    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                    threshold: 'BLOCK_ONLY_HIGH'
                  }
                ],
                generationConfig: {
                  temperature: 0.9,
                  topP: 1,
                  topK: 1,
                  maxOutputTokens: 2048
                }
              })
            }
          );

          if (!response.ok) {
            throw new Error('Failed to send message');
          }

          const data = await response.json();
          const aiResponse: Message = {
            id: Date.now().toString(),
            text: data.candidates[0].content.parts[0].text,
            sender: 'ai',
            timestamp: new Date().toLocaleTimeString(),
            status: 'delivered'
          };

          setChatHistory(prev => ({
            ...prev,
            [selectedChat]: {
              ...prev[selectedChat],
              messages: [...prev[selectedChat].messages, aiResponse],
              isLoading: false
            }
          }));
        } catch (err) {
          setChatHistory(prev => ({
            ...prev,
            [selectedChat]: {
              ...prev[selectedChat],
              isLoading: false,
              error: err instanceof Error ? err.message : 'Failed to send message'
            }
          }));
        }
      };

      const handleClearChat = () => {
        if (selectedChat) {
          setChatHistory(prev => ({
            ...prev,
            [selectedChat]: { 
              messages: [],
              isLoading: false,
              error: null
            }
          }));
        }
      };

      const handleSaveSettings = async (newApiKey: string, newModel: string) => {
        // Save to localStorage
        localStorage.setItem('geminiApiKey', newApiKey);
        localStorage.setItem('selectedModel', newModel);

        // Update state
        setApiKey(newApiKey);
        setSelectedModel(newModel);
      };

      return (
        <div className="flex h-screen">
          <SettingsModal
            apiKey={apiKey}
            selectedModel={selectedModel}
            onSave={handleSaveSettings}
            onModelChange={(model) => setSelectedModel(model)}
          />
          <ChatSidebar 
            selectedChat={selectedChat} 
            onSelectChat={handleSelectChat} 
          />
          {selectedChat && (
            <ChatWindow
              chatId={selectedChat}
              messages={chatHistory[selectedChat]?.messages || []}
              onNewMessage={handleNewMessage}
              onClearChat={handleClearChat}
              isLoading={chatHistory[selectedChat]?.isLoading || false}
              error={chatHistory[selectedChat]?.error || null}
            />
          )}
        </div>
      );
    };

    export default App;
