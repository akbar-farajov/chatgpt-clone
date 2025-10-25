import Chat from "@/components/chat";

import React from "react";
import { getChatById, getMessagesByChatId, getChats } from "@/actions/chat";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";

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

  const initialMessages = (await getMessagesByChatId(chatId)) || [];
  const chats = (await getChats()) || [];

  return (
    <Chat
      chatId={chatId}
      initialMessages={initialMessages}
      chats={chats}
      initialTitle={chat.title}
      user={{
        id: user.id,
        name: user.user_metadata.name,
        email: user.email || "",
        avatar: user.user_metadata.avatar_url,
      }}
    />
  );
};

export default ChatPage;
