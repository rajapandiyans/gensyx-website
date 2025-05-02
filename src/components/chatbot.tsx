
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, X, Loader2, AlertCircle } from 'lucide-react'; // Added AlertCircle
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

  // Initial greeting message
  React.useEffect(() => {
    if (isOpen && messages.length === 0) {
       setMessages([{ id: 'init-greet', text: "Hi there! How can I help you with GenSyx Solutions today?", sender: 'assistant' }]);
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // Run only when isOpen changes

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input; // Capture input before clearing
    setInput('');
    setIsLoading(true);

    try {
      // console.log("Sending query to AI:", currentInput); // Log before sending
      const assistantResponse = await getChatbotResponse({ query: currentInput });
      // console.log("Received AI response:", assistantResponse); // Log response
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        text: assistantResponse.reply,
        sender: 'assistant',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Chatbot error fetching response:", error);
       // Log the full error for debugging
       console.error("Full error object:", error);
      const errorMessageText = `Sorry, I encountered an issue processing your request. Please try again later. ${error.message ? `(Details: ${error.message})` : ''}`;
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: errorMessageText,
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
      <Button
         aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
         className="chatbot-trigger"
         onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </Button>

      {/* Chatbot Popup Window */}
      {isOpen && (
        <div className="chatbot-popup" role="dialog" aria-modal="true" aria-labelledby="chatbot-title">
          {/* Header */}
          <div className="chatbot-header">
            <h3 id="chatbot-title" className="font-semibold text-lg flex items-center gap-2">
              <Bot size={20} className="text-primary" /> GenSyx Assistant
            </h3>
            <Button variant="ghost" size="icon" aria-label="Close chat" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="chatbot-messages" aria-live="polite">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn('chatbot-message', {
                  'chatbot-message-user': message.sender === 'user',
                  'chatbot-message-assistant': message.sender === 'assistant',
                  'chatbot-message-error': message.sender === 'error',
                })}
              >
                 {message.sender === 'error' && <AlertCircle className="h-5 w-5 text-destructive mr-2 flex-shrink-0" />}
                 <div className="message-bubble">{message.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start pl-2 py-2" role="status" aria-label="Loading response">
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
              aria-label="Your message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" aria-label="Send message" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

