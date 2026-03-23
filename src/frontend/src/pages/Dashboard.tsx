import { Badge } from "@/components/ui/badge";
import {
  useScriptTemplates,
  useVideoEntries,
  useWorkflowStages,
} from "@/hooks/useQueries";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Eye,
  Globe,
  ImageIcon,
  Layout,
  Mic,
  Scissors,
  Search,
  TrendingUp,
  Upload,
  Video,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const WORKFLOW_STEPS = [
  {
    label: "Trending",
    icon: TrendingUp,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    label: "Script",
    icon: Zap,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  { label: "Voice", icon: Mic, color: "text-cyan-400", bg: "bg-cyan-400/10" },
  {
    label: "Visuals",
    icon: ImageIcon,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    label: "Edit",
    icon: Scissors,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    label: "SEO",
    icon: Search,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    label: "Thumbnail",
    icon: Layout,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    label: "Upload",
    icon: Upload,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
];

const CHECKLIST = [
  { done: true, label: "Find trending topic for today" },
  { done: true, label: "Generate viral script" },
  { done: false, label: "Record AI voiceover" },
  { done: false, label: "Generate B-roll visuals" },
  { done: false, label: "Edit & add captions" },
  { done: false, label: "Upload to all 3 platforms" },
];

const STYLE_DOTS: Record<string, string> = {
  Dark: "bg-gray-400",
  Emotional: "bg-pink-400",
  Motivational: "bg-yellow-400",
  Mystery: "bg-violet-400",
};

const STYLE_BADGE: Record<string, string> = {
  Dark: "border-gray-500/40 text-gray-400",
  Emotional: "border-pink-500/40 text-pink-400",
  Motivational: "border-yellow-500/40 text-yellow-400",
  Mystery: "border-violet-500/40 text-violet-400",
};

const FALLBACK_TEMPLATES = [
  {
    title: "The Dark Truth About Success",
    style: "Dark",
    hook: "This will change how you see success forever...",
  },
  {
    title: "I Wish I Knew This Earlier",
    style: "Emotional",
    hook: "I wish someone had told me this earlier...",
  },
  {
    title: "One Decision Changes Everything",
    style: "Motivational",
    hook: "You're one decision away from your dream life...",
  },
  {
    title: "The Secret Nobody Talks About",
    style: "Mystery",
    hook: "Nobody knows why this works, until now...",
  },
];

const STATS = [
  {
    label: "Pipeline Steps",
    icon: Zap,
    color: "text-violet-400",
    fixed: 8 as number | null,
  },
  {
    label: "Platforms",
    icon: Eye,
    color: "text-cyan-400",
    fixed: 3 as number | null,
  },
];

export default function Dashboard() {
  const { data: stages } = useWorkflowStages();
  const { data: templates } = useScriptTemplates();
  const { data: entries } = useVideoEntries();

  const videosToday =
    entries?.filter((e) => {
      const d = new Date(Number(e.date) / 1_000_000);
      return d.toDateString() === new Date().toDateString();
    }).length ?? 0;
  const liveVideos = entries?.filter((e) => e.status === "live").length ?? 0;
  const stageCount = stages?.length ?? 8;

  const displayTemplates =
    templates && templates.length > 0 ? templates : FALLBACK_TEMPLATES;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-semibold text-foreground">
          Good morning, Creator \uD83D\uDC4B
        </h1>
        <p className="text-muted-foreground mt-1">
          Your viral video automation system is ready. Let&apos;s create.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-card border border-border rounded-lg p-4 card-hover">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Videos Today</span>
            <Video size={16} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {videosToday}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 card-hover">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Total Live</span>
            <Globe size={16} className="text-green-400" />
          </div>
          <div className="text-2xl font-bold text-foreground">{liveVideos}</div>
        </div>
        {STATS.map((s) => (
          <div
            key={s.label}
            className="bg-card border border-border rounded-lg p-4 card-hover"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <s.icon size={16} className={s.color} />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {s.label === "Pipeline Steps" ? stageCount : s.fixed}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="rounded-xl border border-violet-500/20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0B1C3A 0%, #1a0e3a 50%, #2d1260 100%)",
          boxShadow: "0 0 40px rgba(109,40,217,0.15)",
        }}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Zap size={18} className="text-violet-400" />
            <h2 className="text-lg font-semibold text-foreground">
              Automation Workflow
            </h2>
            <Badge className="ml-auto bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs">
              8 Steps
            </Badge>
          </div>
          <div className="flex flex-wrap gap-3 md:gap-0 md:flex-nowrap items-start">
            {WORKFLOW_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-1">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`h-10 w-10 rounded-xl ${step.bg} border border-white/10 flex items-center justify-center`}
                  >
                    <step.icon size={18} className={step.color} />
                  </div>
                  <span className="text-xs text-white/70 font-medium whitespace-nowrap">
                    {step.label}
                  </span>
                </div>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <ArrowRight
                    size={14}
                    className="text-white/30 mx-1 mt-[-16px] hidden md:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Recent Script Templates
          </h3>
          <div className="space-y-3">
            {displayTemplates.slice(0, 4).map((t) => (
              <div
                key={t.title}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
              >
                <div
                  className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${STYLE_DOTS[t.style] ?? "bg-primary"}`}
                />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {t.title}
                  </div>
                  <div className="text-xs text-muted-foreground truncate mt-0.5">
                    {t.hook}
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs flex-shrink-0 ${STYLE_BADGE[t.style] ?? ""}`}
                >
                  {t.style}
                </Badge>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Daily Checklist
          </h3>
          <div className="space-y-2">
            {CHECKLIST.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors"
              >
                {item.done ? (
                  <CheckCircle2
                    size={18}
                    className="text-green-400 flex-shrink-0"
                  />
                ) : (
                  <Circle
                    size={18}
                    className="text-muted-foreground flex-shrink-0"
                  />
                )}
                <span
                  className={`text-sm ${item.done ? "text-muted-foreground line-through" : "text-foreground"}`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {CHECKLIST.filter((c) => c.done).length}/{CHECKLIST.length}
            </span>
            <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{
                  width: `${(CHECKLIST.filter((c) => c.done).length / CHECKLIST.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
