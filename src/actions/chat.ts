"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UIMessage } from "ai";
import { Json } from "@/lib/supabase/types";

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

export async function saveMessage(chatId: number, message: UIMessage) {
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
  chatId: number
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
