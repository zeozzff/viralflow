import type { NavSection } from "@/App";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  FileText,
  LayoutDashboard,
  Plus,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";

const NAV_ITEMS: { id: NavSection; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "scripts", label: "Scripts", icon: <FileText size={18} /> },
  { id: "prompts", label: "Prompts", icon: <BookOpen size={18} /> },
  { id: "tools", label: "Tools", icon: <Wrench size={18} /> },
  { id: "calendar", label: "Calendar", icon: <Calendar size={18} /> },
  { id: "monetize", label: "Monetize", icon: <TrendingUp size={18} /> },
];

interface SidebarProps {
  active: NavSection;
  onNavigate: (s: NavSection) => void;
}

export default function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <div className="flex h-full flex-col bg-sidebar border-r border-border">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 glow-blue">
          <Zap size={18} className="text-primary fill-primary" />
        </div>
        <div>
          <span className="text-base font-bold text-foreground tracking-tight">
            ViralFlow
          </span>
          <div className="text-xs text-muted-foreground">
            AI Video Automation
          </div>
        </div>
      </div>
      <div className="px-4 py-4">
        <Button
          data-ocid="sidebar.new_video.primary_button"
          className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => onNavigate("calendar")}
        >
          <Plus size={16} /> New Video
        </Button>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              type="button"
              key={item.id}
              data-ocid={`nav.${item.id}.link`}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <span className={isActive ? "text-primary" : ""}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="px-5 py-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          &copy; {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
