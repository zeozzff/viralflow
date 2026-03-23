import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTools } from "@/hooks/useQueries";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";

const FALLBACK_TOOLS = [
  {
    name: "n8n",
    category: "Automation",
    isFree: true,
    url: "https://n8n.io",
    description:
      "Open-source workflow automation. Self-host for free. Connect any API, trigger daily workflows, and orchestrate the entire pipeline.",
  },
  {
    name: "Make.com",
    category: "Automation",
    isFree: true,
    url: "https://make.com",
    description:
      "Visual automation platform. Free tier: 1,000 ops/month. Drag-and-drop workflow builder for non-coders.",
  },
  {
    name: "GPT-4o mini",
    category: "Script AI",
    isFree: true,
    url: "https://platform.openai.com",
    description:
      "OpenAI's cheapest model. ~$0.15/1M tokens. Perfect for script generation \u2014 costs less than $1/month for daily videos.",
  },
  {
    name: "Groq",
    category: "Script AI",
    isFree: true,
    url: "https://groq.com",
    description:
      "Free LLM inference API with ultra-fast response times. Supports Llama 3.1 70B. Zero cost for script generation.",
  },
  {
    name: "ElevenLabs",
    category: "Voice TTS",
    isFree: true,
    url: "https://elevenlabs.io",
    description:
      "Most realistic AI voices. Free tier: 10,000 characters/month. Enough for 30+ short scripts. Premium voices included.",
  },
  {
    name: "Kokoro TTS",
    category: "Voice TTS",
    isFree: true,
    url: "https://huggingface.co/hexgrad/Kokoro-82M",
    description:
      "100% free open-source TTS model. Run locally or on Hugging Face. Quality comparable to ElevenLabs. Zero cost.",
  },
  {
    name: "Runway ML",
    category: "Video AI",
    isFree: true,
    url: "https://runwayml.com",
    description:
      "AI video generation. Free tier: 125 credits/month. Gen-2 text-to-video and image-to-video. Perfect for B-roll clips.",
  },
  {
    name: "Pika Labs",
    category: "Video AI",
    isFree: true,
    url: "https://pika.art",
    description:
      "Free AI video generation platform. Create 3-5 second clips from text or images. Great for visual storytelling.",
  },
  {
    name: "CapCut",
    category: "Video Editing",
    isFree: true,
    url: "https://capcut.com",
    description:
      "100% free professional video editor. Auto-captions, effects, music library, templates. Desktop + mobile. No watermark.",
  },
  {
    name: "Clipchamp",
    category: "Video Editing",
    isFree: true,
    url: "https://clipchamp.com",
    description:
      "Free browser-based editor by Microsoft. Auto-subtitle generation, stock footage library, direct export to 1080p.",
  },
  {
    name: "Google Trends",
    category: "SEO Research",
    isFree: true,
    url: "https://trends.google.com",
    description:
      "Discover what's trending globally or by region in real-time. Find rising queries before they peak. Free forever.",
  },
  {
    name: "TubeBuddy",
    category: "SEO Research",
    isFree: true,
    url: "https://tubebuddy.com",
    description:
      "YouTube SEO tool. Free tier includes keyword research, tag suggestions, and competitor analysis. Chrome extension.",
  },
  {
    name: "Canva Free",
    category: "Thumbnail",
    isFree: true,
    url: "https://canva.com",
    description:
      "Design thumbnails in minutes with free templates. AI background remover, drag-and-drop, brand kit. 100% free tier.",
  },
  {
    name: "YouTube Data API",
    category: "Upload",
    isFree: true,
    url: "https://developers.google.com/youtube",
    description:
      "Official YouTube API. Upload videos, set metadata, schedule publishing. 10,000 units/day free quota.",
  },
  {
    name: "Buffer Free",
    category: "Upload",
    isFree: true,
    url: "https://buffer.com",
    description:
      "Schedule posts to YouTube, Instagram, and TikTok from one dashboard. Free plan: 3 channels, 10 scheduled posts.",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Automation: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  "Script AI": "bg-violet-500/15 text-violet-300 border-violet-500/30",
  "Voice TTS": "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "Video AI": "bg-pink-500/15 text-pink-300 border-pink-500/30",
  "Video Editing": "bg-orange-500/15 text-orange-300 border-orange-500/30",
  "SEO Research": "bg-green-500/15 text-green-300 border-green-500/30",
  Thumbnail: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  Upload: "bg-red-500/15 text-red-300 border-red-500/30",
};

export default function Tools() {
  const { data: tools, isLoading } = useTools();
  const allTools = tools && tools.length > 0 ? tools : FALLBACK_TOOLS;

  const grouped = allTools.reduce<Record<string, typeof allTools>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Free Tool Stack
        </h2>
        <p className="text-muted-foreground mt-1">
          Every tool you need to automate viral video creation \u2014 100% free
          or free tier.
        </p>
      </div>
      {isLoading ? (
        <div
          data-ocid="tools.loading_state"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-36 rounded-xl bg-muted/30 animate-pulse"
            />
          ))}
        </div>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {category}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map((tool) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-xl p-4 card-hover flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {tool.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className={`text-xs ${CATEGORY_COLORS[tool.category] ?? ""}`}
                      >
                        {tool.category}
                      </Badge>
                      <Badge className="text-xs bg-green-500/15 text-green-300 border-green-500/30">
                        {tool.isFree ? "FREE" : "FREE TIER"}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                    {tool.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    data-ocid="tools.visit.button"
                    className="h-7 text-xs gap-1 text-primary hover:text-primary/80 justify-start px-0"
                    onClick={() => window.open(tool.url, "_blank")}
                  >
                    <ExternalLink size={12} /> Visit Tool
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
