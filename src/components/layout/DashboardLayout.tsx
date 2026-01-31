import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Table,
  Upload,
  Menu,
  X,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { logout } from "@/lib/auth";
import vsiLogo from "@/assets/vsi-logo.jpeg";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItemsConfig = [
  { path: "/home", labelKey: "home" as const, icon: Home },
  { path: "/dashboard", labelKey: "dashboard" as const, icon: LayoutDashboard },
  { path: "/reports", labelKey: "reports" as const, icon: Table },
  { path: "/upload", labelKey: "upload" as const, icon: Upload },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navItems = navItemsConfig.map((item) => ({
    ...item,
    label: t.nav[item.labelKey],
  }));

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
            <img
              src={vsiLogo}
              alt="VSI Logo"
              className="h-14 w-14 object-contain rounded-lg bg-white p-1 shadow-sm"
            />
            <div>
              <h1 className="font-bold text-sidebar-foreground text-lg leading-tight">
                VSI
              </h1>
              <p className="text-xs text-sidebar-foreground/70">
                संशोधनेन संवृद्धिः
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-transform group-hover:scale-110",
                      isActive && "drop-shadow-sm"
                    )}
                  />
                  <span className="font-medium">{item.label}</span>
                  {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-sidebar-border">
            <p className="text-xs text-sidebar-foreground/60 text-center">
              © 2024 SugarMill Pro
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top navbar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>

              <div className="hidden sm:block">
                <h2 className="font-semibold text-foreground">
                  {navItems.find((item) => item.path === location.pathname)
                    ?.label || "Dashboard"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  Daily Manufacturing Report System
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />

              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-full">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs font-medium text-success">
                  Live Data
                </span>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Today</p>
                <p className="text-xs text-muted-foreground">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Logout Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
