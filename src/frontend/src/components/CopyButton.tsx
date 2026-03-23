import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
  "data-ocid"?: string;
}

export default function CopyButton({
  text,
  className,
  label,
  "data-ocid": ocid,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button
      variant="ghost"
      size="sm"
      data-ocid={ocid}
      onClick={handleCopy}
      className={`gap-1.5 text-xs h-7 ${copied ? "text-green-400" : "text-muted-foreground hover:text-foreground"} ${className ?? ""}`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied!" : (label ?? "Copy")}
    </Button>
  );
}
