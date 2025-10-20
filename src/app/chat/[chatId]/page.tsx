import Chat from "@/components/chat";

import React from "react";
import { getChatById, getMessagesByChatId } from "@/actions/chat";
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
  const chat = await getChatById(parseInt(chatId));

  if (!chat) {
    notFound();
  }

  const initialMessages = (await getMessagesByChatId(parseInt(chatId))) || [];

  return <Chat chatId={chatId} initialMessages={initialMessages} />;
};

export default ChatPage;
