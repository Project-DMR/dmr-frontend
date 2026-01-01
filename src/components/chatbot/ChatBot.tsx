import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

export function ChatBot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: t.chatbot.welcome, isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Generate response based on keywords
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response: string = t.chatbot.responses.default;
      
      if (lowerInput.includes('recovery')) {
        response = t.chatbot.responses.recovery;
      } else if (lowerInput.includes('production')) {
        response = t.chatbot.responses.production;
      } else if (lowerInput.includes('efficiency')) {
        response = t.chatbot.responses.efficiency;
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        isBot: true
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  return (
    <>
      {/* Chat Window */}
      <div className={cn(
        "fixed bottom-24 right-6 w-80 md:w-96 bg-card rounded-2xl shadow-xl border border-border z-50 overflow-hidden transition-all duration-300",
        isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
      )}>
        {/* Header */}
        <div className="bg-gradient-primary p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/20 rounded-lg">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-primary-foreground">{t.chatbot.title}</h4>
              <p className="text-xs text-primary-foreground/70">Always here to help</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="h-72 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2",
                message.isBot ? "justify-start" : "justify-end"
              )}
            >
              {message.isBot && (
                <div className="p-1.5 bg-primary/10 rounded-lg h-fit">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div className={cn(
                "max-w-[80%] px-3 py-2 rounded-2xl text-sm",
                message.isBot 
                  ? "bg-muted text-foreground rounded-tl-md" 
                  : "bg-primary text-primary-foreground rounded-tr-md"
              )}>
                {message.text}
              </div>
              {!message.isBot && (
                <div className="p-1.5 bg-primary rounded-lg h-fit">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatbot.placeholder}
              className="flex-1"
            />
            <Button type="submit" size="icon" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 transition-all duration-300",
          isOpen 
            ? "bg-muted text-foreground hover:bg-muted/80" 
            : "bg-gradient-primary hover:opacity-90"
        )}
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </>
  );
}