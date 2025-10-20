import Chat from "@/components/chat";

import React from "react";
import { getMessagesByChatId } from "@/actions/chat";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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

  const initialMessages = (await getMessagesByChatId(parseInt(chatId))) || [];

  return <Chat chatId={chatId} initialMessages={initialMessages} />;
};

export default ChatPage;
