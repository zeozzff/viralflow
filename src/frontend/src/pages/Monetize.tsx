import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  DollarSign,
  Package,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const STRATEGIES = [
  {
    icon: DollarSign,
    title: "YouTube AdSense",
    badge: "Passive Income",
    badgeClass: "bg-green-500/15 text-green-300 border-green-500/30",
    color: "text-green-400",
    borderGlow: "hover:border-green-500/40",
    timeline: "4\u20136 months to monetize",
    requirements: [
      "1,000 subscribers minimum",
      "4,000 watch hours OR 10M Shorts views in 90 days",
      "AdSense account linked",
      "No community guidelines violations",
    ],
    tips: [
      "Shorts earn ~$0.03\u20130.06 per 1,000 views",
      "Use Shorts to grow subs \u2192 monetize long-form",
      "Finance/tech/business niches: CPM $15\u201350",
      "Post daily Shorts + 1 long-form/week",
    ],
    cta: "YPP Requirements \u2192",
    url: "https://support.google.com/youtube/answer/72851",
  },
  {
    icon: TrendingUp,
    title: "Affiliate Marketing",
    badge: "High ROI",
    badgeClass: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    color: "text-cyan-400",
    borderGlow: "hover:border-cyan-500/40",
    timeline: "Start earning from Day 1",
    requirements: [
      "Join Amazon, ClickBank, or Impact",
      "Add links in bio + video description",
      "Disclose affiliate relationship (FTC)",
      "Create content featuring products naturally",
    ],
    tips: [
      "Finance niche: $50\u2013200 per conversion",
      "Tech niche: $20\u201380 per sale",
      "Health niche: $10\u201350 per sale",
      "AI tools: Jasper, Canva Pro pay 20-30% recurring",
    ],
    cta: "Best Affiliate Programs \u2192",
    url: "https://impact.com",
  },
  {
    icon: Users,
    title: "Faceless Channel Playbook",
    badge: "Scalable",
    badgeClass: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    color: "text-violet-400",
    borderGlow: "hover:border-violet-500/40",
    timeline: "0\u201312 months to 100K",
    requirements: [
      "Pick ONE niche (finance, motivation, AI)",
      "Commit to 1\u20133 videos per day for 90 days",
      "Use this AI pipeline consistently",
      "Model hooks from top 10 videos in niche",
    ],
    tips: [
      "Top niches 2024: Finance, True Crime, AI Tools",
      "Repost same video on 3 platforms = 3x reach",
      "Study retention graphs for drop-off points",
      "Batch 7 days of content in 1 day",
    ],
    cta: "Niche Research Tool \u2192",
    url: "https://vidiq.com",
  },
  {
    icon: Star,
    title: "Brand Sponsorships",
    badge: "Premium",
    badgeClass: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
    color: "text-yellow-400",
    borderGlow: "hover:border-yellow-500/40",
    timeline: "Realistic at 10K+ subscribers",
    requirements: [
      "10K subscribers minimum",
      "Strong niche authority",
      "Media kit with stats & demographics",
      "Email pitch template ready",
    ],
    tips: [
      "Charge $100\u2013500 per video at 10K subs",
      "Use Grin.co or AspireIQ for brand deals",
      "Pitch brands before you need money",
      "Niche brands pay MORE than big brands",
    ],
    cta: "Create Media Kit \u2192",
    url: "https://canva.com",
  },
  {
    icon: Package,
    title: "Digital Products",
    badge: "100% Margin",
    badgeClass: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    color: "text-orange-400",
    borderGlow: "hover:border-orange-500/40",
    timeline: "Launch at any subscriber count",
    requirements: [
      "Package THIS system as a $47\u201397 course",
      "Use Gumroad or Lemon Squeezy (free)",
      "Create a landing page (Notion or Carrd)",
      "Promote in every video description",
    ],
    tips: [
      "Sell n8n workflow as template: $27\u201347",
      "Bundle: System + prompts + scripts = $97",
      "Discord community for $9/month recurring",
      "1,000 followers \u00d7 $47 = $47K first launch",
    ],
    cta: "Sell on Gumroad \u2192",
    url: "https://gumroad.com",
  },
];

const INCOME_ITEMS = [
  { label: "AdSense (100K views/mo)", value: "$50\u2013200/mo" },
  { label: "Affiliate (1% conversion)", value: "$500\u20132K/mo" },
  { label: "Sponsorships (1 deal/mo)", value: "$200\u20131K/mo" },
  { label: "Digital Products", value: "$500\u20135K/mo" },
];

export default function Monetize() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Monetization Strategies
        </h2>
        <p className="text-muted-foreground mt-1">
          Turn your viral video system into multiple income streams.
        </p>
      </div>

      <div
        className="rounded-xl border border-primary/20 p-5"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.13 0.08 265 / 0.5) 0%, oklch(0.16 0.1 280 / 0.5) 100%)",
        }}
      >
        <div className="flex flex-wrap gap-6">
          {INCOME_ITEMS.map((item) => (
            <div key={item.label}>
              <div className="text-lg font-bold text-primary">{item.value}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Combined monthly potential at scale:{" "}
          <span className="text-primary font-semibold">
            $1,250 \u2013 $8,200+/month
          </span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {STRATEGIES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            data-ocid={`monetize.item.${i + 1}`}
            className={`bg-card border border-border rounded-xl p-5 card-hover ${s.borderGlow} transition-all`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-card border border-border">
                  <s.icon size={18} className={s.color} />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {s.title}
                </h3>
              </div>
              <Badge variant="outline" className={`text-xs ${s.badgeClass}`}>
                {s.badge}
              </Badge>
            </div>
            <p className="text-xs text-primary mb-3 font-medium">
              \u23f1 {s.timeline}
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Requirements
                </p>
                <ul className="space-y-1">
                  {s.requirements.map((r) => (
                    <li
                      key={r}
                      className="text-xs text-muted-foreground flex gap-1.5"
                    >
                      <span className={`${s.color} mt-0.5 flex-shrink-0`}>
                        \u2022
                      </span>{" "}
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Pro Tips
                </p>
                <ul className="space-y-1">
                  {s.tips.map((t) => (
                    <li
                      key={t}
                      className="text-xs text-muted-foreground flex gap-1.5"
                    >
                      <span className="text-primary mt-0.5 flex-shrink-0">
                        \u2192
                      </span>{" "}
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 text-xs font-medium ${s.color} hover:opacity-80 transition-opacity`}
            >
              {s.cta} <ArrowRight size={12} />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
