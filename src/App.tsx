import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { LanguageProvider } from "@/contexts/LanguageContext";

/* Pages */
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import AIAnalysis from "@/pages/AIAnalysis";
import Reports from "@/pages/Reports";
import Upload from "@/pages/Upload";
import NotFound from "@/pages/NotFound";

/* Auth */
import { isAuthenticated } from "@/lib/auth";

const queryClient = new QueryClient();

/* Protected wrapper */
const ProtectedPage = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            {/* =====================
                PUBLIC ROUTES
            ===================== */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* =====================
                PROTECTED ROUTES
            ===================== */}
            <Route
              path="/home"
              element={
                <ProtectedPage>
                  <DashboardLayout>
                    <Home />
                  </DashboardLayout>
                </ProtectedPage>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedPage>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedPage>
              }
            />

            {/* ✅ AI ANALYSIS — AFTER DASHBOARD */}
            <Route
              path="/ai-analysis"
              element={
                <ProtectedPage>
                  <DashboardLayout>
                    <AIAnalysis />
                  </DashboardLayout>
                </ProtectedPage>
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedPage>
                  <DashboardLayout>
                    <Reports />
                  </DashboardLayout>
                </ProtectedPage>
              }
            />

            <Route
              path="/upload"
              element={
                <ProtectedPage>
                  <DashboardLayout>
                    <Upload />
                  </DashboardLayout>
                </ProtectedPage>
              }
            />

            {/* =====================
                FALLBACK
            ===================== */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Global chatbot */}
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
