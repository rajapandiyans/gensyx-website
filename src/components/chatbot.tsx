
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, X, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getChatbotResponse } from '@/ai/flows/chatbot-flow';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant' | 'error';
}

// Function to get time-based greeting
const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning!";
  } else if (hour < 18) {
    return "Good afternoon!";
  } else {
    return "Good evening!";
  }
};


export function Chatbot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [initialGreetingSet, setInitialGreetingSet] = React.useState(false);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting message - Runs only on client after hydration
  React.useEffect(() => {
    if (isOpen && !initialGreetingSet) {
      const greeting = getTimeBasedGreeting();
      setMessages([{ id: 'init-greet', text: `${greeting} How can I help you with GenSyx Solutions today? Ask me about our services, projects, or contact info!`, sender: 'assistant' }]);
      setInitialGreetingSet(true);
    }
     // Reset greeting flag if closed
     if (!isOpen) {
        setInitialGreetingSet(false);
     }
  }, [isOpen, initialGreetingSet]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    let errorMessageText = "Sorry, I encountered an issue processing your request. Please try again later."; // Default error

    try {
      // console.log("Sending query to AI:", currentInput);
      const assistantResponse = await getChatbotResponse({ query: currentInput });
      // console.log("Received AI response:", assistantResponse);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        text: assistantResponse.reply,
        sender: 'assistant',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
       console.error("Chatbot error fetching response:", error);
       console.error("Full error object:", error); // Log the full error structure

        // Extract the core message from the potentially nested error
       const errorMsg = error.message || '';
       const coreErrorMsg = errorMsg.replace("Failed to get chatbot response from flow: ", ""); // Remove prefix if present

        // **Crucial Check:** Directly look for the specific API key error message thrown by the backend flow
        if (coreErrorMsg.includes("Invalid API Key. Please check your GOOGLE_GENAI_API_KEY")) {
             errorMessageText = "Sorry, the chatbot is currently unavailable due to a configuration issue (API Key). Please contact support.";
        } else if (coreErrorMsg.includes("Initialization failed")) {
             errorMessageText = "Sorry, the chatbot is currently unavailable due to a server initialization error. Please contact support.";
        } else if (coreErrorMsg.includes("model was not found")) {
             errorMessageText = "Sorry, there's an issue with the AI model configuration. Please contact support.";
        } else if (coreErrorMsg.includes("quota exceeded")) {
            errorMessageText = "Sorry, the request limit has been reached. Please try again later.";
        }
        // Fallback for other errors, including the specific message if available
        else if (coreErrorMsg) {
           // Show a generic message but include the specific error detail for debugging
           errorMessageText = `Sorry, an error occurred. Please try again later. (Details: ${coreErrorMsg})`;
        }


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
                 <div className="message-bubble flex items-start gap-2">
                   {message.sender === 'error' && <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />}
                   <span>{message.text}</span>
                 </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-center pl-2 py-2 text-muted-foreground" role="status" aria-label="Loading response">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Typing...
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
              className="flex-grow bg-input/70 border-border/50 focus:border-primary"
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
