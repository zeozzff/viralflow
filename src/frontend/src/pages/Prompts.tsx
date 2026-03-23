import CopyButton from "@/components/CopyButton";
import { Badge } from "@/components/ui/badge";
import { usePrompts } from "@/hooks/useQueries";
import { motion } from "motion/react";

const STAGE_COLORS: Record<string, string> = {
  "Trending Topics": "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  "Script Writing": "bg-violet-500/15 text-violet-300 border-violet-500/30",
  "Voice Generation": "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "Visual Creation": "bg-pink-500/15 text-pink-300 border-pink-500/30",
  "Video Editing": "bg-orange-500/15 text-orange-300 border-orange-500/30",
  "SEO Metadata": "bg-green-500/15 text-green-300 border-green-500/30",
  "Thumbnail Creation": "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  "Platform Upload": "bg-red-500/15 text-red-300 border-red-500/30",
};

const FALLBACK_PROMPTS = [
  {
    stageName: "Trending Topics",
    toolName: "Google Trends + ChatGPT",
    promptText:
      "Search Google Trends for the top 5 trending topics in [NICHE] this week. Then ask ChatGPT: 'Give me 10 viral video angle ideas about [TRENDING TOPIC] for YouTube Shorts and TikTok. Focus on emotional hooks, shocking facts, and curiosity gaps. Format as: Hook + 1 sentence description.'",
  },
  {
    stageName: "Script Writing",
    toolName: "GPT-4o-mini / Groq",
    promptText:
      "Write a 30-second viral short-form video script about [TOPIC] in [STYLE] style. Format: HOOK (0-3s), BUILD-UP (3-15s), REVELATION (15-25s), TWIST/LESSON (25-30s). Rules: Simple language (8th grade), one idea per sentence, strong emotional trigger, end with curiosity gap or call to action.",
  },
  {
    stageName: "Voice Generation",
    toolName: "ElevenLabs Free / Kokoro TTS",
    promptText:
      "Generate a realistic AI voiceover for the following script. Voice settings: Speaking rate 1.1x (slightly fast for Shorts), pitch neutral, emotional emphasis on the HOOK and REVELATION sections. Add natural pauses after each section. Export as MP3, 44.1kHz.",
  },
  {
    stageName: "Visual Creation",
    toolName: "Runway ML / Pika Labs",
    promptText:
      "Generate a 5-second video clip for [TOPIC]. Style: cinematic, dark atmosphere, slight slow-motion. No text overlay. Aspect ratio 9:16 (vertical). The visual should match this mood: [EMOTIONAL TONE]. Focus on: close-up shots, natural lighting, high contrast.",
  },
  {
    stageName: "Video Editing",
    toolName: "CapCut / Clipchamp",
    promptText:
      "Edit the video with these settings: 1) Add auto-captions (large font, centered, bold, white text with black outline). 2) Add background music at 15% volume (lo-fi or cinematic). 3) Cut to beat or sentence breaks. 4) Add 2-3 relevant emojis as text overlays. 5) Export as MP4, 1080x1920, H.264, 30fps.",
  },
  {
    stageName: "SEO Metadata",
    toolName: "TubeBuddy / VidIQ / ChatGPT",
    promptText:
      "Generate high-CTR YouTube Shorts metadata for a video about [TOPIC] in [STYLE] style. Provide: 1) Title (60 chars max, include power word + number or question). 2) Description (150 chars, include main keyword + CTA). 3) 15 hashtags (mix of broad + niche). 4) Tags (20 relevant keywords). 5) Thumbnail text (5 words max, all caps).",
  },
  {
    stageName: "Thumbnail Creation",
    toolName: "Canva Free / Adobe Express",
    promptText:
      "Create a YouTube Shorts thumbnail with: Background: [VIVID COLOR or dramatic scene]. Text: '[HOOK LINE IN CAPS]' \u2014 font bold, large, high contrast. Visual element: shocked/surprised face OR dramatic object. Include small brand logo bottom-right. Color scheme: high contrast (red+yellow OR black+white+neon). Size: 1280x720px.",
  },
  {
    stageName: "Platform Upload",
    toolName: "YouTube API / Buffer Free",
    promptText:
      "Upload the video to: YouTube Shorts (title + description + hashtags + thumbnail), Instagram Reels (caption with first hashtag, tag 3-5 relevant accounts), TikTok (caption with trending sounds + hashtags). Schedule posting time: 7-9 AM or 7-9 PM local timezone. Use Buffer free plan to schedule all 3 platforms from one dashboard.",
  },
];

export default function Prompts() {
  const { data: prompts, isLoading } = usePrompts();
  const allPrompts = prompts && prompts.length > 0 ? prompts : FALLBACK_PROMPTS;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Prompt Library
        </h2>
        <p className="text-muted-foreground mt-1">
          Ready-to-use AI prompts for every stage of the automation pipeline.
        </p>
      </div>
      {isLoading ? (
        <div
          data-ocid="prompts.loading_state"
          className="grid md:grid-cols-2 gap-4"
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-48 rounded-xl bg-muted/30 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {allPrompts.map((prompt, idx) => (
            <motion.div
              key={`${prompt.stageName}-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              data-ocid={`prompts.item.${idx + 1}`}
              className="bg-card border border-border rounded-xl p-4 card-hover flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <Badge
                  variant="outline"
                  className={`text-xs ${STAGE_COLORS[prompt.stageName] ?? ""}`}
                >
                  {prompt.stageName}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {prompt.toolName}
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed flex-1">
                {prompt.promptText}
              </p>
              <div className="flex justify-end">
                <CopyButton
                  data-ocid="prompts.copy.button"
                  text={prompt.promptText}
                  label="Copy Prompt"
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
