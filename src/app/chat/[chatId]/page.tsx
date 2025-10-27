import Chat from "@/components/chat";

import React from "react";
import { getChatById, getMessagesByChatId, getChats } from "@/actions/chat";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { ChatMessage } from "@/app/api/chat/route";
import { getProfile } from "@/actions/profile";

const ChatPage = async ({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  const { chatId } = await params;
  const chat = await getChatById(chatId);

  if (!chat) {
    notFound();
  }
  const { data: profile, error } = await getProfile();
  if (error) {
    redirect("/login");
  }
  const initialMessages = (await getMessagesByChatId(chatId)) || [];
  const chats = (await getChats()) || [];

  return (
    <Chat
      chatId={chatId}
      initialMessages={initialMessages as ChatMessage[]}
      chats={chats}
      initialTitle={chat.title}
      profile={profile}
    />
  );
};

export default ChatPage;
