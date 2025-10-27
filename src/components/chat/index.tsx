"use client";
import { FC, useState, startTransition, useEffect, useRef } from "react";
import { UIMessage, useChat } from "@ai-sdk/react";
import { Messages } from "@/components/chat/messages";
import { ChatComposer } from "@/components/chat/chat-composer";
import { DefaultChatTransport } from "ai";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/sidebar";
import type { Chat, Profile } from "@/lib/types";
import { createChat } from "@/actions/chat";
import { useRouter } from "next/navigation";
import { PromptInputMessage } from "../ai-elements/prompt-input";

interface ChatProps {
  chatId?: string;
  initialMessages: UIMessage[];
  chats: Chat[];
  initialTitle?: string | null;
  profile: Profile | null;
}

const Chat: FC<ChatProps> = ({
  chatId,
  initialMessages,
  chats,
  initialTitle,
  profile,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState<string | undefined>(
    initialTitle || undefined
  );
  const [input, setInput] = useState("");
  const hasCheckedPendingMessage = useRef(false);

  const { messages, sendMessage, status, stop } = useChat({
    id: chatId,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      prepareSendMessagesRequest(request) {
        return {
          body: {
            id: request.id,
            message: request.messages.at(-1),
            ...request.body,
          },
        };
      },
    }),
    onData({ data, type }) {
      if (type === "data-title") {
        setTitle(data as string);
      }
    },
  });

  useEffect(() => {
    if (chatId && !hasCheckedPendingMessage.current) {
      hasCheckedPendingMessage.current = true;

      const pendingMessage = sessionStorage.getItem(
        `pending-message-${chatId}`
      );
      if (pendingMessage) {
        sessionStorage.removeItem(`pending-message-${chatId}`);
        try {
          const parsedMessage = JSON.parse(pendingMessage);
          sendMessage(parsedMessage);
        } catch {
          sendMessage({ text: pendingMessage });
        }
      }
    }
  }, [chatId, sendMessage]);

  const handleSubmit = async (data: PromptInputMessage) => {
    const hasText = Boolean(data.text?.trim());
    const hasFiles = (data.files?.length ?? 0) > 0;

    if (!hasText && !hasFiles) {
      return;
    }

    if (!chatId) {
      startTransition(async () => {
        const { data: chatData } = await createChat();
        if (chatData?.id) {
          sessionStorage.setItem(
            `pending-message-${chatData.id}`,
            JSON.stringify({ text: data.text || "", files: data.files || [] })
          );
          setInput("");
          router.push(`/chat/${chatData.id}`);
        }
      });
      return;
    }

    sendMessage({ text: data.text || "", files: data.files || [] });

    setInput("");
  };

  return (
    <SidebarProvider>
      <AppSidebar
        chats={chats}
        currentChatId={chatId}
        currentTitle={title}
        profile={profile}
      />
      <div className="max-h-screen h-screen flex flex-col w-full">
        <nav className="p-2 border-b flex items-center gap-2">
          <SidebarTrigger />
          {title && (
            <div className="text-sm text-muted-foreground">{title}</div>
          )}
        </nav>
        <div className="flex flex-col overflow-hidden relative h-full">
          <Messages messages={messages} status={status} profile={profile} />
          <ChatComposer
            onSubmit={handleSubmit}
            onStop={stop}
            setInput={setInput}
            input={input}
            status={status}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Chat;
