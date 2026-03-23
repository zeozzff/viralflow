import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ScriptTemplate {
    title: string;
    twist: string;
    body: string;
    hook: string;
    style: string;
    category: string;
}
export interface Tool {
    url: string;
    name: string;
    description: string;
    isFree: boolean;
    category: string;
}
export type Time = bigint;
export interface Prompt {
    promptText: string;
    toolName: string;
    stageName: string;
}
export interface VideoEntry {
    status: string;
    title: string;
    date: Time;
    platform: string;
}
export interface WorkflowStage {
    tools: Array<string>;
    name: string;
    description: string;
    stepNumber: bigint;
}
export interface backendInterface {
    addVideoEntry(title: string, platform: string, status: string, date: Time): Promise<void>;
    deleteVideoEntry(date: Time): Promise<void>;
    getAllVideoEntries(): Promise<Array<VideoEntry>>;
    getPrompts(): Promise<Array<Prompt>>;
    getScriptTemplates(): Promise<Array<ScriptTemplate>>;
    getTools(): Promise<Array<Tool>>;
    getVideoEntry(date: Time): Promise<VideoEntry>;
    getWorkflowStages(): Promise<Array<WorkflowStage>>;
    updateVideoEntry(date: Time, title: string, platform: string, status: string): Promise<void>;
}
