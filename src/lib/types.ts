import { Database } from "@/lib/supabase/types";
import { InferUITools, UIDataTypes, UIMessage } from "ai";
export type Chat = Database["public"]["Tables"]["chats"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

import { getTools } from "@/tools";

const tools = getTools();

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;
