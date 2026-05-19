export type AttachmentType = "image" | "audio";

export interface Attachment {
  id: string;
  type: AttachmentType;
  uri: string;
  name: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  attachments: Attachment[];
  timestamp: number;
}
