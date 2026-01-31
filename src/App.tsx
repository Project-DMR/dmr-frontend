import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { LanguageProvider } from "@/contexts/LanguageContext";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AIAnalysis from "./pages/AIAnalysis";   // ✅ AI PAGE
import Reports from "./pages/Reports";
import Upload from "./pages/Upload";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai-analysis" element={<AIAnalysis />} /> {/* ✅ AFTER DASHBOARD */}
              <Route path="/reports" element={<Reports />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DashboardLayout>

          {/* Global Chatbot */}
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
