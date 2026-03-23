import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddVideoEntry, useVideoEntries } from "@/hooks/useQueries";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const PLATFORM_STYLES: Record<string, string> = {
  YouTube: "bg-red-500/20 text-red-300 border-red-500/30",
  Instagram: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  TikTok: "bg-slate-500/20 text-slate-300 border-slate-500/30",
};

const STATUS_STYLES: Record<string, string> = {
  pending: "border-yellow-500/30 text-yellow-300",
  live: "border-green-500/30 text-green-300",
  done: "border-blue-500/30 text-blue-300",
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type LocalEntry = {
  title: string;
  platform: string;
  status: string;
  day: number;
};

function makeSeedEntries(
  today: Date,
  viewYear: number,
  viewMonth: number,
): LocalEntry[] {
  const offsets = [
    {
      platform: "YouTube",
      title: "AI Side Hustle Secret",
      status: "live",
      off: 0,
    },
    {
      platform: "Instagram",
      title: "Morning Routine That Changed My Life",
      status: "live",
      off: 0,
    },
    {
      platform: "TikTok",
      title: "5 Signs You're Shadowbanned",
      status: "done",
      off: -2,
    },
    {
      platform: "YouTube",
      title: "The Truth About Passive Income",
      status: "pending",
      off: 2,
    },
    {
      platform: "Instagram",
      title: "How I Went Viral in 30 Days",
      status: "pending",
      off: 3,
    },
    {
      platform: "TikTok",
      title: "ChatGPT Prompt Nobody Shows You",
      status: "pending",
      off: 5,
    },
    {
      platform: "YouTube",
      title: "Broke vs Rich Morning Routines",
      status: "pending",
      off: 7,
    },
  ];
  return offsets
    .map((s) => {
      const d = new Date(today);
      d.setDate(today.getDate() + s.off);
      if (d.getFullYear() !== viewYear || d.getMonth() !== viewMonth)
        return null;
      return {
        title: s.title,
        platform: s.platform,
        status: s.status,
        day: d.getDate(),
      };
    })
    .filter(Boolean) as LocalEntry[];
}

export default function CalendarPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPlatform, setNewPlatform] = useState("YouTube");
  const [newDay, setNewDay] = useState(today.getDate());

  const { data: backendEntries } = useVideoEntries();
  const addEntry = useAddVideoEntry();

  const backendLocal: LocalEntry[] = (backendEntries ?? []).flatMap((e) => {
    const d = new Date(Number(e.date) / 1_000_000);
    if (d.getFullYear() !== viewYear || d.getMonth() !== viewMonth) return [];
    return [
      {
        title: e.title,
        platform: e.platform,
        status: e.status,
        day: d.getDate(),
      },
    ];
  });

  const seedLocal = makeSeedEntries(today, viewYear, viewMonth);
  const allLocal = [...seedLocal, ...backendLocal];

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    const d = new Date(viewYear, viewMonth, newDay, 12, 0, 0);
    const ns = BigInt(d.getTime()) * 1_000_000n;
    try {
      await addEntry.mutateAsync({
        title: newTitle,
        platform: newPlatform,
        status: "pending",
        date: ns,
      });
      toast.success("Video added to calendar!");
      setNewTitle("");
      setDialogOpen(false);
    } catch {
      toast.error("Failed to add entry");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Content Calendar
          </h2>
          <p className="text-muted-foreground mt-1">
            Schedule and track your daily video uploads across all platforms.
          </p>
        </div>
        <Button
          data-ocid="calendar.add.primary_button"
          onClick={() => setDialogOpen(true)}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          <Plus size={16} /> Add Video
        </Button>
      </div>

      <div className="flex gap-3 flex-wrap">
        {Object.entries(PLATFORM_STYLES).map(([p, cls]) => (
          <Badge key={p} variant="outline" className={`${cls} text-xs`}>
            {p}
          </Badge>
        ))}
        <span className="text-xs text-muted-foreground ml-2 self-center">
          Status:
        </span>
        {Object.entries(STATUS_STYLES).map(([s, cls]) => (
          <Badge key={s} variant="outline" className={`${cls} text-xs`}>
            {s}
          </Badge>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevMonth}
            data-ocid="calendar.pagination_prev"
          >
            <ChevronLeft size={18} />
          </Button>
          <span className="text-base font-semibold text-foreground">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextMonth}
            data-ocid="calendar.pagination_next"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
        <div className="grid grid-cols-7 border-b border-border">
          {DAY_NAMES.map((d) => (
            <div
              key={d}
              className="py-2 text-center text-xs font-medium text-muted-foreground"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: firstDay }, (_, i) => i).map((pad) => (
            <div
              key={pad}
              className="min-h-[80px] p-1 border-r border-b border-border/50"
            />
          ))}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const day = idx + 1;
            const isToday =
              day === today.getDate() &&
              viewMonth === today.getMonth() &&
              viewYear === today.getFullYear();
            const dayEntries = allLocal.filter((e) => e.day === day);
            return (
              <div
                key={day}
                className={`min-h-[80px] p-1.5 border-r border-b border-border/50 ${isToday ? "bg-primary/5" : "hover:bg-muted/20"} transition-colors`}
              >
                <div
                  className={`text-xs font-medium mb-1 h-5 w-5 flex items-center justify-center rounded-full ${
                    isToday
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {day}
                </div>
                <div className="space-y-0.5">
                  {dayEntries.slice(0, 3).map((e, ei) => (
                    <motion.div
                      key={`${e.platform}-${e.title}-${ei}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`text-[10px] px-1.5 py-0.5 rounded border truncate ${PLATFORM_STYLES[e.platform] ?? "bg-muted/20 text-muted-foreground border-border"}`}
                      title={`${e.title} (${e.status})`}
                    >
                      {e.title.slice(0, 14)}
                      {e.title.length > 14 ? "\u2026" : ""}
                    </motion.div>
                  ))}
                  {dayEntries.length > 3 && (
                    <div className="text-[10px] text-muted-foreground pl-1">
                      +{dayEntries.length - 3}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Scheduled Videos
        </h3>
        <div className="space-y-2">
          {allLocal
            .sort((a, b) => a.day - b.day)
            .slice(0, 8)
            .map((e, i) => (
              <motion.div
                key={`${e.platform}-${e.title}-${e.day}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                data-ocid={`calendar.item.${i + 1}`}
                className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3"
              >
                <Badge
                  variant="outline"
                  className={`text-xs flex-shrink-0 ${PLATFORM_STYLES[e.platform] ?? ""}`}
                >
                  {e.platform}
                </Badge>
                <span className="text-sm text-foreground flex-1 truncate">
                  {e.title}
                </span>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  Day {e.day}
                </span>
                <Badge
                  variant="outline"
                  className={`text-xs flex-shrink-0 ${STATUS_STYLES[e.status] ?? ""}`}
                >
                  {e.status}
                </Badge>
              </motion.div>
            ))}
          {allLocal.length === 0 && (
            <div
              data-ocid="calendar.empty_state"
              className="text-center py-12 text-muted-foreground"
            >
              <div className="text-4xl mb-3">📅</div>
              <p className="text-sm">
                No videos scheduled this month. Add your first video!
              </p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          data-ocid="calendar.dialog"
          className="bg-card border-border"
        >
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Schedule New Video
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                Video Title
              </Label>
              <Input
                data-ocid="calendar.title.input"
                placeholder="Enter video title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-muted/50 border-border"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Platform
                </Label>
                <Select value={newPlatform} onValueChange={setNewPlatform}>
                  <SelectTrigger
                    data-ocid="calendar.platform.select"
                    className="bg-muted/50 border-border"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="YouTube">YouTube</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Day of Month
                </Label>
                <Input
                  data-ocid="calendar.day.input"
                  type="number"
                  min={1}
                  max={31}
                  value={newDay}
                  onChange={(e) =>
                    setNewDay(Number.parseInt(e.target.value) || 1)
                  }
                  className="bg-muted/50 border-border"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              data-ocid="calendar.cancel.button"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              data-ocid="calendar.submit.primary_button"
              onClick={handleAdd}
              disabled={addEntry.isPending || !newTitle.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              {addEntry.isPending ? "Adding..." : "Add to Calendar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
