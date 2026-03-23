import CopyButton from "@/components/CopyButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useScriptTemplates } from "@/hooks/useQueries";
import { Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const STYLES = ["Dark", "Emotional", "Motivational", "Mystery"] as const;
type Style = (typeof STYLES)[number];

const STYLE_HOOKS: Record<Style, string> = {
  Dark: "This will change how you see [TOPIC] forever...",
  Emotional: "I wish someone had told me this earlier about [TOPIC]...",
  Motivational: "You're one decision away from mastering [TOPIC]...",
  Mystery: "Nobody knows why [TOPIC] does this, until now...",
};

const STYLE_COLORS: Record<Style, string> = {
  Dark: "border-gray-500/50 text-gray-300 bg-gray-500/10",
  Emotional: "border-pink-500/50 text-pink-300 bg-pink-500/10",
  Motivational: "border-yellow-500/50 text-yellow-300 bg-yellow-500/10",
  Mystery: "border-violet-500/50 text-violet-300 bg-violet-500/10",
};

function buildScript(topic: string, style: Style): string {
  const t = topic || "this topic";
  const hook = STYLE_HOOKS[style].replace(/\[TOPIC\]/g, t);
  const lines = [
    "\uD83C\uDFAC HOOK (0\u20133s):",
    `"${hook}"`,
    "",
    "\uD83D\uDCC8 BUILD-UP (3\u201315s):",
    `"Nobody talks about ${t} but here's what actually happens when you dig deeper... The moment I discovered this, everything changed. Millions go through this daily without knowing why."`,
    "",
    "\uD83D\uDCA1 REVELATION (15\u201325s):",
    `"The truth is \u2014 ${t} is the opposite of what society tells you. One study found 87% of people who learned this never looked back. Here's the one thing that separates them."`,
    "",
    "\uD83C\uDF00 TWIST / LESSON (25\u201330s):",
    `"And that's why the people who win don't follow the crowd. Follow for more secrets like this."`,
    "",
    "---",
    `\uD83D\uDCCC Title: "${hook.slice(0, 60)}${hook.length > 60 ? "..." : ""}"`,
    `\uD83D\uDCCC Hashtags: #${t.replace(/\s+/g, "")} #shorts #viral #${style.toLowerCase()} #mindset`,
    '\uD83D\uDCCC CTA: "Follow for daily insights that will change your perspective."',
  ];
  return lines.join("\n");
}

const FALLBACK_TEMPLATES = [
  {
    title: "The Dark Truth About Success",
    style: "Dark",
    hook: "This will change how you see success forever...",
    body: "Nobody talks about the real price of success. The 3 AM nights, the failed attempts, the people who doubted every move.",
    twist:
      "Success isn't about talent. It's about refusing to quit when everyone else does.",
    category: "Mindset",
  },
  {
    title: "The Lesson I Learned Too Late",
    style: "Emotional",
    hook: "I wish someone had told me this at 20...",
    body: "I spent years chasing the wrong goals. Working for validation instead of purpose. The day I said no \u2014 everything changed.",
    twist:
      "The most powerful thing you can do is stop seeking approval from people who never believed in you.",
    category: "Life",
  },
  {
    title: "One Decision Away",
    style: "Motivational",
    hook: "You're one decision away from a completely different life...",
    body: "Right now someone with your exact same skills is living your dream life. The only difference? They made a decision you keep postponing.",
    twist:
      "The risk of staying the same is always greater than the risk of change. Decide today.",
    category: "Growth",
  },
  {
    title: "The Algorithm Nobody Talks About",
    style: "Mystery",
    hook: "Nobody knows why TikTok pushes certain videos, until now...",
    body: "There's a hidden metric deciding which videos go viral. Not followers. Not likes. It's completion rate \u2014 and this changes everything.",
    twist:
      "The platform rewards content that makes people STAY. Make the first 3 seconds impossible to skip.",
    category: "Creator",
  },
];

export default function Scripts() {
  const { data: templates, isLoading } = useScriptTemplates();
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState<Style>("Dark");
  const [generated, setGenerated] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerated(null);
    await new Promise((r) => setTimeout(r, 1200));
    setGenerated(buildScript(topic, style));
    setIsGenerating(false);
  };

  const allTemplates =
    templates && templates.length > 0 ? templates : FALLBACK_TEMPLATES;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Script Generator
        </h2>
        <p className="text-muted-foreground mt-1">
          Generate 30-second viral scripts with emotional hooks and curiosity
          gaps.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Generate New Script
        </h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label
              htmlFor="script-topic"
              className="text-xs text-muted-foreground"
            >
              Topic / Niche
            </Label>
            <Input
              id="script-topic"
              data-ocid="scripts.topic.input"
              placeholder="e.g. silent quitting, crypto, AI tools..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-muted/50 border-border"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleGenerate();
              }}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Video Style</Label>
            <div className="flex gap-2 flex-wrap">
              {STYLES.map((s) => (
                <button
                  type="button"
                  key={s}
                  data-ocid={`scripts.style.${s.toLowerCase()}.toggle`}
                  onClick={() => setStyle(s)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                    style === s
                      ? STYLE_COLORS[s]
                      : "border-border text-muted-foreground hover:border-border/80"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Button
          data-ocid="scripts.generate.primary_button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          {isGenerating ? (
            <>
              <Sparkles size={16} className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Sparkles size={16} /> Generate Script
            </>
          )}
        </Button>

        <AnimatePresence>
          {generated && (
            <motion.div
              key="result"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-5 rounded-lg bg-muted/40 border border-border overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                <span className="text-xs font-medium text-muted-foreground">
                  Generated \u2014 {style} Style
                </span>
                <CopyButton
                  data-ocid="scripts.copy.button"
                  text={generated}
                  label="Copy Script"
                />
              </div>
              <pre className="p-4 text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
                {generated}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Script Templates Library
        </h3>
        {isLoading ? (
          <div
            data-ocid="scripts.loading_state"
            className="grid md:grid-cols-2 gap-4"
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 rounded-xl bg-muted/30 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {allTemplates.map((t) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl p-4 card-hover"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    {t.title}
                  </h4>
                  <Badge
                    variant="outline"
                    className={`text-xs ${STYLE_COLORS[(t.style as Style)] ?? ""}`}
                  >
                    {t.style}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  <span className="font-medium text-cyan-400">Hook:</span>{" "}
                  {t.hook}
                </p>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {t.body}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-violet-400">Twist:</span>{" "}
                  {t.twist}
                </p>
                <div className="mt-3 flex justify-end">
                  <CopyButton
                    data-ocid="scripts.template.copy.button"
                    text={`Hook: ${t.hook}\n\nBody: ${t.body}\n\nTwist: ${t.twist}`}
                    label="Copy Template"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
