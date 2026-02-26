import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

/* ================================
   ✅ YOUR BACKEND URL
================================ */
const CHAT_API = "https://dmr-backend.onrender.com/api/chat";

export function ChatBot() {
  const { t } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: t.chatbot.welcome, isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* ================================
     Auto scroll
  ================================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ================================
     Send → Backend
  ================================= */
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;

    setMessages(prev => [
      ...prev,
      { id: Date.now(), text: userText, isBot: false }
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(CHAT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userText })
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: data.reply || "I couldn't understand. Try asking differently.",
          isBot: true
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "⚠️ Server not reachable. Please try again later.",
          isBot: true
        }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* ================= CHAT WINDOW ================= */}
      <div
        className={cn(
          "fixed bottom-24 right-6 w-80 md:w-96 bg-card rounded-2xl shadow-xl border border-border z-50 overflow-hidden transition-all duration-300",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        )}
      >
        {/* HEADER */}
        <div className="bg-gradient-primary p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary-foreground" />
            <h4 className="font-semibold text-primary-foreground">
              {t.chatbot.title}
            </h4>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* MESSAGES */}
        <div className="h-72 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex gap-2",
                m.isBot ? "justify-start" : "justify-end"
              )}
            >
              {m.isBot && <Bot className="h-4 w-4 text-primary" />}

              <div
                className={cn(
                  "max-w-[80%] px-3 py-2 rounded-2xl text-sm",
                  m.isBot
                    ? "bg-muted text-foreground"
                    : "bg-primary text-primary-foreground"
                )}
              >
                {m.text}
              </div>

              {!m.isBot && <User className="h-4 w-4 text-primary-foreground" />}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatbot.placeholder}
              disabled={loading}
              className="flex-1"
            />

            <Button type="submit" size="icon" disabled={loading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* FLOAT BUTTON */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </Button>
    </>
  );
}
