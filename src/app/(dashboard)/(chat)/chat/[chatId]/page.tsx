import { Chat } from "../../components";
import { FC } from "react";
import { getChatById, getMessagesByChatId } from "@/actions/chat";
import { notFound, redirect } from "next/navigation";
import { ChatMessage } from "@/lib/types";
import { getProfile } from "@/actions/profile";
import { Metadata } from "next";
import { getChatUsageStats } from "@/actions/usage";
import { LanguageModelUsage } from "ai";
import { Provider } from "@ai-sdk-tools/store";
import { cookies } from "next/headers";

interface Props {
  params: Promise<{ chatId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const chatId = (await params).chatId;
  const chat = await getChatById(chatId);

  if (!chat?.title) {
    return {
      title: "AI Chat",
      description: "AI Chat with your documents",
    };
  }

  return {
    title: `${chat.title}`,
    description: `AI Chat with your documents - ${chat.title}`,
  };
}

const ChatPage: FC<Props> = async ({ params }) => {
  const { chatId } = await params;
  const chat = await getChatById(chatId);
  if (!chat) {
    notFound();
  }
  const result = await getChatUsageStats(chatId);
  const { data: usageStats } = result;

  const { data: profile, error } = await getProfile();
  if (error) {
    redirect("/login");
  }

  if (!profile) {
    redirect("/login");
  }

  const initialMessages = (await getMessagesByChatId(chatId)) || [];
  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

  return (
    <Provider>
      <Chat
        chatTitle={chat.title ?? undefined}
        chatId={chatId}
        initialMessages={initialMessages as ChatMessage[]}
        profile={profile}
        usage={usageStats as LanguageModelUsage}
        initialModel={modelIdFromCookie?.value}
      />
    </Provider>
  );
};

export default ChatPage;
