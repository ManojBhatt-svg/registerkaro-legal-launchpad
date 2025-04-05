
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, X, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm the RK Assistant. Ask me anything about your trademark registration. 😊",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message
    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with trademark registration! What specific information do you need?",
        "That's a good question about trademarks. The registration process typically takes 18-24 months in India.",
        "Our standard trademark package includes filing with the Trademark Registry, documentation, and application tracking.",
        "Yes, you can register multiple classes under one trademark application, but each class will incur additional fees.",
        "I understand your concern. Let me connect you with one of our legal experts who can provide more detailed information.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiResponse: Message = {
        id: messages.length + 2,
        text: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) {
      setIsMinimized(false);
    }
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="rounded-full w-14 h-14 bg-brand-blue hover:bg-blue-700 shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
      
      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
            isMinimized ? 'w-72 h-16' : 'w-80 sm:w-96 h-[30rem]'
          }`}
        >
          {/* Header */}
          <div className="bg-brand-blue p-3 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <h3 className="font-medium">RK Assistant</h3>
            </div>
            <div className="flex space-x-2">
              <button onClick={toggleMinimize} className="hover:text-gray-200">
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>
              <button onClick={toggleChat} className="hover:text-gray-200">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="p-4 h-[calc(30rem-7.5rem)] overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-4 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg p-3 ${
                        msg.isUser
                          ? 'bg-brand-orange text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.isUser ? 'text-orange-50' : 'text-gray-500'}`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input Area */}
              <div className="border-t p-3 bg-gray-50">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={message.trim() === ''}
                    className="bg-brand-orange hover:bg-orange-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
