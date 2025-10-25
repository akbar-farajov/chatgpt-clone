"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { generateText, UIMessage } from "ai";
import { Json } from "@/lib/supabase/types";
import { google } from "@ai-sdk/google";

export async function createChat() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    const { data, error } = await supabase
      .from("chats")
      .insert({
        user_id: user.id,
      })
      .select("id")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { error: (error as Error).message, data: null };
  }
}

export async function saveMessage(chatId: string, message: UIMessage) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("messages")
      .insert({
        chat_id: chatId,
        role: message.role,
        parts: message.parts as Json,
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
}

export async function getMessagesByChatId(
  chatId: string
): Promise<UIMessage[] | null> {
  const supabase = await createClient();
  try {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true })
      .throwOnError();
    const messages = data.map((message) => ({
      role: message.role as UIMessage["role"],
      parts: message.parts as UIMessage["parts"],
    }));

    return messages as UIMessage[];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getChats() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getChatById(chatId: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .eq("id", chatId)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: UIMessage;
}) {
  const { text: title } = await generateText({
    model: google("gemini-2.5-flash"),
    system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}

export async function updateChat(chatId: string, { title }: { title: string }) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("chats")
      .update({ title })
      .eq("id", chatId)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
