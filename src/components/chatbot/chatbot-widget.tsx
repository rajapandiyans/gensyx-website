
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bot, Send, X, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { getChatbotResponse, type ChatbotInput, type ChatbotOutput, type ChatbotMessage } from '@/ai/flows/company-chatbot-flow';
import { isAiConfigured } from '@/ai/ai-instance'; // Import the configuration check
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Helper function to get time-based greeting
const getTimeBasedGreeting = (): string => {
  const [greeting, setGreeting] = useState("Hello! How can I help you today?");

  useEffect(() => {
    // This effect runs only on the client after hydration
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning! How can I help you today?");
    else if (hour < 18) setGreeting("Good afternoon! How can I assist you?");
    else setGreeting("Good evening! What can I do for you?");
  }, []); // Empty dependency array ensures it runs once on mount

  return greeting;
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null); // Start as null to indicate loading state
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const initialGreeting = getTimeBasedGreeting();

  // Check AI configuration status on mount (client-side)
  useEffect(() => {
    const configured = isAiConfigured();
    setAiAvailable(configured);

    if (!configured) {
      const configErrorMsg = "Sorry, the chatbot is currently unavailable due to a configuration issue (API Key likely missing or invalid). Please contact support.";
      setError(configErrorMsg);
      console.error("Chatbot Init Error: AI is not configured. Check GOOGLE_GENAI_API_KEY environment variable.");
      // Add a message indicating the configuration issue
      setMessages([{ role: 'model', content: [{ text: configErrorMsg }] }]);
    } else {
      // Add initial greeting message from the bot only if AI is configured and messages are empty
       if (messages.length === 0) {
          setMessages([{ role: 'model', content: [{ text: initialGreeting }] }]);
       }
    }
  }, [initialGreeting]); // Re-run if greeting changes (though it shouldn't after initial mount)

  // Scroll to bottom when new messages arrive or loading state changes
  useEffect(() => {
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollElement) {
      // Use requestAnimationFrame for smoother scrolling after DOM updates
      requestAnimationFrame(() => {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      });
    }
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async () => {
    // Prevent sending if input is empty, loading, or AI is not configured/available
    if (!input.trim() || isLoading || !aiAvailable) return;

    const userMessageText = input.trim();
    const userMessage: ChatbotMessage = { role: 'user', content: [{ text: userMessageText }] };

    // Optimistically add user message
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null); // Clear previous errors

    // Prepare history for the API call (only user and model messages)
    // Ensure history matches the ChatbotMessage structure expected by the flow
    const historyForApi: ChatbotMessage[] = messages
      .filter(msg => msg.role === 'user' || msg.role === 'model')
      .map(msg => ({
         role: msg.role,
         // Ensure content is always an array of text objects
         content: msg.content.map(part => ({ text: part.text }))
      }));


    try {
      const chatbotInput: ChatbotInput = {
        message: userMessageText,
        history: historyForApi,
      };
      // console.log("Sending to backend:", JSON.stringify(chatbotInput)); // Debug log
      const result: ChatbotOutput = await getChatbotResponse(chatbotInput);
      // console.log("Received from backend:", JSON.stringify(result)); // Debug log

      if (result && result.response) {
         // Add bot response
         const botMessage: ChatbotMessage = { role: 'model', content: [{ text: result.response }] };
         setMessages((prev) => [...prev, botMessage]);
      } else {
         // Handle cases where the response structure might be invalid, though the flow should prevent this
         throw new Error("Received an empty or invalid response from the chatbot.");
      }
    } catch (err: any) {
      console.error("Error sending message:", err);
      // Display the specific error message thrown by the flow wrapper
      const errorMessage = err.message || "Sorry, I encountered an issue processing your request. Please try again later.";
      setError(errorMessage); // Set error state to display it
      // Add error message to chat for visibility
      const errorMessageObj: ChatbotMessage = { role: 'model', content: [{ text: `Error: ${errorMessage}` }] };
      setMessages((prev) => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false); // Ensure loading state is turned off
    }
  }, [input, isLoading, messages, aiAvailable]); // Include aiAvailable in dependencies

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
     if (error) setError(null); // Clear error when user starts typing
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading && aiAvailable) { // Check aiAvailable here too
      handleSendMessage();
    }
  };

   // Determine placeholder text based on AI availability state
   const getPlaceholderText = () => {
     if (aiAvailable === null) return "Initializing chatbot..."; // Loading state
     if (!aiAvailable) return "Chatbot unavailable (Configuration issue)";
     return "Type your message...";
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
          <DialogHeader className="p-4 border-b border-border/20 flex-shrink-0 bg-gradient-to-b from-card to-primary/5 flex flex-row justify-between items-center">
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-primary">
              <Bot className="h-6 w-6" /> GenSyx Assistant
            </DialogTitle>
             {/* Explicit Close Button */}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
               <X className="h-4 w-4" />
               <span className="sr-only">Close chat</span>
            </Button>
          </DialogHeader>

           {/* Messages Area */}
           <ScrollArea ref={scrollAreaRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-background/50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-end gap-2 animate-fade-in-up", // Add subtle animation
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
                style={{ animationDelay: `${index * 0.05}s`}} // Stagger animation
              >
                {message.role === 'model' && (
                  <Avatar className="h-8 w-8 flex-shrink-0 border border-primary/30">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Bot size={18} />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2 text-sm break-words shadow-sm", // Added slight shadow
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-card text-card-foreground border border-border/20 rounded-bl-none', // Use card background for bot
                     // Add specific error styling for bot messages containing "Error:"
                    message.role === 'model' && message.content[0]?.text.startsWith('Error:') && 'bg-destructive/10 text-destructive border-destructive/30'
                  )}
                >
                   {/* Render message content */}
                   {message.content[0]?.text}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8 flex-shrink-0 border border-border/50">
                     <AvatarFallback className="bg-secondary/10 text-secondary font-semibold">U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start items-center gap-2 animate-fade-in-up">
                 <Avatar className="h-8 w-8 flex-shrink-0 border border-primary/30">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Bot size={18} />
                    </AvatarFallback>
                  </Avatar>
                <div className="bg-muted text-muted-foreground rounded-lg px-4 py-2 rounded-bl-none inline-flex items-center gap-2 shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
              {/* Display persistent configuration error if AI is not available */}
             {aiAvailable === false && (
                 <div className="flex items-center justify-center gap-2 text-destructive text-xs p-2 bg-destructive/10 rounded-md border border-destructive/30 mt-2">
                   <AlertCircle className="h-4 w-4 flex-shrink-0" />
                   <span>{error || "Chatbot configuration error."}</span>
                 </div>
             )}
          </ScrollArea>

           {/* Input Area */}
          <DialogFooter className="p-4 border-t border-border/20 flex-shrink-0 bg-card">
            <div className="flex w-full items-center gap-2">
              <Input
                type="text"
                 placeholder={getPlaceholderText()}
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-input/70 border-border/50 focus:border-primary focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed"
                 disabled={isLoading || aiAvailable !== true} // Disable based on loading or availability
              />
              <Button
                type="button"
                size="icon"
                onClick={handleSendMessage}
                 disabled={isLoading || !input.trim() || aiAvailable !== true} // Disable based on loading, input, or availability
                aria-label="Send Message"
                 className="disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </div>
             {/* Display runtime errors here if AI is available but an error occurred */}
             {error && aiAvailable === true && (
                 <p className="text-xs text-destructive text-center pt-1 px-2 flex items-center gap-1 justify-center">
                    <AlertCircle className="h-3 w-3 flex-shrink-0" />
                    {error}
                 </p>
             )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

    