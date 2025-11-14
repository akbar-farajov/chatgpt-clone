"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { generateText } from "ai";
import type { Json } from "@/lib/supabase/types";
import { google } from "@ai-sdk/google";
import { ChatMessage } from "@/lib/types";
import { getUser } from "./auth";
import { revalidatePath } from "next/cache";

export async function createChat({ chatId }: { chatId: string }) {
  const supabase = await createClient();

  const { data: user } = await getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    const { data, error } = await supabase
      .from("chats")
      .insert({
        user_id: user.id,
        id: chatId,
      })
      .select("id")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/", "layout");

    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { error: (error as Error).message, data: null };
  }
}

export async function saveMessage(chatId: string, message: ChatMessage) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("messages")
      .insert({
        chat_id: chatId,
        role: message.role,
        message_id: message.id,
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
): Promise<ChatMessage[] | null> {
  const supabase = await createClient();
  try {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true })
      .throwOnError();
    const messages = data.map((message) => ({
      role: message.role as ChatMessage["role"],
      parts: message.parts as ChatMessage["parts"],
      id: message.message_id as ChatMessage["id"],
    }));

    return messages as ChatMessage[];
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
  message: ChatMessage;
}) {
  const { text: title } = await generateText({
    model: google("gemini-2.5-flash-lite"),
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

    revalidatePath("/", "layout");

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteChat(chatId: string) {
  const supabase = await createClient();
  try {
    const { data } = await supabase
      .from("chats")
      .delete()
      .eq("id", chatId)
      .throwOnError();

    revalidatePath("/", "layout");

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteMessagesAfterRegenerate(
  chatId: string,
  messageId: string
) {
  const supabase = await createClient();
  try {
    const { data: messageToDelete, error: fetchError } = await supabase
      .from("messages")
      .select("created_at")
      .eq("chat_id", chatId)
      .eq("message_id", messageId)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    const { data } = await supabase
      .from("messages")
      .delete()
      .eq("chat_id", chatId)
      .gte("created_at", messageToDelete.created_at)
      .throwOnError();

    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: (error as Error).message };
  }
}
