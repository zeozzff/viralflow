import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Menu, Search } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-border bg-sidebar/80 backdrop-blur px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-muted-foreground"
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </Button>
      <div className="relative flex-1 max-w-sm">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          data-ocid="header.search_input"
          placeholder="Search scripts, tools, prompts..."
          className="pl-9 bg-muted/50 border-border text-sm h-9"
        />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs bg-primary/20 text-primary font-semibold">
              VF
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground hidden sm:block">
            Creator
          </span>
          <Badge className="text-xs bg-primary/20 text-primary border-primary/30 px-1.5 py-0">
            Pro
          </Badge>
        </div>
      </div>
    </header>
  );
}
