
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bot, Send, X, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { getChatbotResponse, type ChatbotInput, type ChatbotOutput, type ChatbotMessage } from '@/ai/flows/company-chatbot-flow';
import { isAiConfigured } from '@/ai/ai-instance';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Helper function to get time-based greeting
const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning! How can I help you today?";
  if (hour < 18) return "Good afternoon! How can I assist you?";
  return "Good evening! What can I do for you?";
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiAvailable, setAiAvailable] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Check AI configuration on mount
  useEffect(() => {
    const configured = isAiConfigured();
    setAiAvailable(configured);
    if (!configured) {
      setError("Sorry, the chatbot is currently unavailable due to a configuration issue (API Key). Please contact support.");
       console.error("Chatbot Error: AI is not configured. Check GOOGLE_GENAI_API_KEY.");
    } else {
       // Add initial greeting message from the bot if AI is configured
        setMessages([{ role: 'model', content: [{ text: getTimeBasedGreeting() }] }]);
    }
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading || !aiAvailable) return;

    const userMessage: ChatbotMessage = { role: 'user', content: [{ text: input.trim() }] };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    // Prepare history for the API call (exclude system messages if any)
    const historyForApi = messages.filter(msg => msg.role === 'user' || msg.role === 'model');

    try {
      const chatbotInput: ChatbotInput = {
        message: userMessage.content[0].text,
        history: historyForApi,
      };
      console.log("Sending to backend:", JSON.stringify(chatbotInput)); // Log input
      const result: ChatbotOutput = await getChatbotResponse(chatbotInput);
       console.log("Received from backend:", JSON.stringify(result)); // Log output

      if (result && result.response) {
         const botMessage: ChatbotMessage = { role: 'model', content: [{ text: result.response }] };
         setMessages((prev) => [...prev, botMessage]);
      } else {
         throw new Error("Received an empty or invalid response from the chatbot.");
      }
    } catch (err: any) {
      console.error("Error sending message:", err);
       const errorMessage = err.message || "Sorry, I encountered an issue processing your request. Please try again later.";
      setError(errorMessage);
       // Add error message to chat
      const errorMessageObj: ChatbotMessage = { role: 'model', content: [{ text: `Error: ${errorMessage}` }] };
      setMessages((prev) => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, aiAvailable]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg z-50 animate-pulse-glow"
        onClick={() => setIsOpen(true)}
        aria-label="Open Chatbot"
      >
        <MessageSquare size={28} />
      </Button>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 flex flex-col max-h-[80vh] overflow-hidden border-primary/20">
          <DialogHeader className="p-4 border-b border-border/20 flex-shrink-0 bg-gradient-to-b from-card to-primary/5">
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-primary">
              <Bot className="h-6 w-6" /> GenSyx Assistant
            </DialogTitle>
              {/* Close button is implicitly handled by DialogContent */}
          </DialogHeader>

           {/* Messages Area */}
           <ScrollArea ref={scrollAreaRef} className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-end gap-2",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'model' && (
                  <Avatar className="h-8 w-8 flex-shrink-0 border border-primary/30">
                    {/* Placeholder for bot avatar */}
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Bot size={18} />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-lg px-4 py-2 text-sm break-words",
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-muted-foreground rounded-bl-none'
                  )}
                >
                  {/* Assuming content has one text part */}
                  {message.content[0]?.text}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8 flex-shrink-0 border border-border/50">
                    {/* Placeholder for user avatar */}
                     <AvatarFallback className="bg-secondary/10 text-secondary">U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-center gap-2">
                 <Avatar className="h-8 w-8 flex-shrink-0 border border-primary/30">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Bot size={18} />
                    </AvatarFallback>
                  </Avatar>
                <div className="bg-muted text-muted-foreground rounded-lg px-4 py-2 rounded-bl-none inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Typing...</span>
                </div>
              </div>
            )}
             {error && !aiAvailable && ( // Show initial config error prominently
                <div className="text-center text-destructive text-sm p-2 bg-destructive/10 rounded-md">
                    {error}
                </div>
             )}
          </ScrollArea>

           {/* Input Area */}
          <DialogFooter className="p-4 border-t border-border/20 flex-shrink-0 bg-card">
            <div className="flex w-full items-center gap-2">
              <Input
                type="text"
                placeholder={aiAvailable ? "Type your message..." : "Chatbot unavailable"}
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-input/70 border-border/50 focus:border-primary focus:ring-primary/50"
                disabled={isLoading || !aiAvailable}
              />
              <Button
                type="button"
                size="icon"
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim() || !aiAvailable}
                aria-label="Send Message"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
             {error && aiAvailable && ( // Show runtime errors here if AI is available
                 <p className="text-xs text-destructive text-center pt-1">{error}</p>
             )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
