export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  sources?: string[];
};
