import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import CalendarPage from "@/pages/Calendar";
import Dashboard from "@/pages/Dashboard";
import Monetize from "@/pages/Monetize";
import Prompts from "@/pages/Prompts";
import Scripts from "@/pages/Scripts";
import Tools from "@/pages/Tools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } },
});

export type NavSection =
  | "dashboard"
  | "scripts"
  | "prompts"
  | "tools"
  | "calendar"
  | "monetize";

function AppInner() {
  const [activeSection, setActiveSection] = useState<NavSection>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "scripts":
        return <Scripts />;
      case "prompts":
        return <Prompts />;
      case "tools":
        return <Tools />;
      case "calendar":
        return <CalendarPage />;
      case "monetize":
        return <Monetize />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {sidebarOpen && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: overlay dismiss
        <div
          role="presentation"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar
          active={activeSection}
          onNavigate={(s) => {
            setActiveSection(s);
            setSidebarOpen(false);
          }}
        />
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuToggle={() => setSidebarOpen((v) => !v)} />
        <main className="flex-1 overflow-y-auto p-6">{renderSection()}</main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  );
}
