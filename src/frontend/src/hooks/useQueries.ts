import type {
  Prompt,
  ScriptTemplate,
  Tool,
  VideoEntry,
  WorkflowStage,
} from "@/backend";
import { useActor } from "@/hooks/useActor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type { ScriptTemplate, Prompt, Tool, VideoEntry, WorkflowStage };

export function useScriptTemplates() {
  const { actor, isFetching } = useActor();
  return useQuery<ScriptTemplate[]>({
    queryKey: ["scriptTemplates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getScriptTemplates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePrompts() {
  const { actor, isFetching } = useActor();
  return useQuery<Prompt[]>({
    queryKey: ["prompts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPrompts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTools() {
  const { actor, isFetching } = useActor();
  return useQuery<Tool[]>({
    queryKey: ["tools"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTools();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVideoEntries() {
  const { actor, isFetching } = useActor();
  return useQuery<VideoEntry[]>({
    queryKey: ["videoEntries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVideoEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useWorkflowStages() {
  const { actor, isFetching } = useActor();
  return useQuery<WorkflowStage[]>({
    queryKey: ["workflowStages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWorkflowStages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddVideoEntry() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      platform,
      status,
      date,
    }: { title: string; platform: string; status: string; date: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.addVideoEntry(title, platform, status, date);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videoEntries"] }),
  });
}

export function useDeleteVideoEntry() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (date: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteVideoEntry(date);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videoEntries"] }),
  });
}

export function useUpdateVideoEntry() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      date,
      title,
      platform,
      status,
    }: { date: bigint; title: string; platform: string; status: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateVideoEntry(date, title, platform, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videoEntries"] }),
  });
}
