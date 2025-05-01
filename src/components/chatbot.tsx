'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getChatbotResponse } from '@/ai/flows/chatbot-flow'; // Import the flow

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant' | 'error';
}

export function Chatbot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const assistantResponse = await getChatbotResponse({ query: input });
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        text: assistantResponse.reply,
        sender: 'assistant',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Sorry, I couldn't process that request. Please try again.",
        sender: 'error',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chatbot Trigger Button */}
      <Button className="chatbot-trigger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </Button>

      {/* Chatbot Popup Window */}
      {isOpen && (
        <div className="chatbot-popup">
          {/* Header */}
          <div className="chatbot-header">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Bot size={20} className="text-primary" /> GenSyx Assistant
            </h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="chatbot-messages">
             {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-sm p-4">
                    Ask me anything about GenSyx Solutions!
                 </div>
             )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn('chatbot-message', {
                  'chatbot-message-user': message.sender === 'user',
                  'chatbot-message-assistant': message.sender === 'assistant',
                  'chatbot-message-error': message.sender === 'error',
                })}
              >
                <div className="message-bubble">{message.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start pl-2 py-2">
                <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="chatbot-input-area">
            <Input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}