"use client";
import { FC, useState, startTransition, useEffect, useRef } from "react";
import { UIMessage, useChat } from "@ai-sdk/react";
import { Messages } from "@/components/chat/messages";
import { ChatComposer } from "@/components/chat/chat-composer";
import { DefaultChatTransport } from "ai";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/sidebar";
import { Chat as ChatType } from "@/types/chat";
import { createChat } from "@/actions/chat";
import { useRouter } from "next/navigation";

interface ChatProps {
  chatId?: string;
  initialMessages: UIMessage[];
  chats: ChatType[];
  initialTitle?: string | null;
}

const Chat: FC<ChatProps> = ({
  chatId,
  initialMessages,
  chats,
  initialTitle,
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
        sendMessage({ text: pendingMessage });
      }
    }
  }, [chatId, sendMessage]);

  const handleSubmit = async () => {
    const hasText = Boolean(input.trim());
    if (!hasText) {
      return;
    }

    if (!chatId) {
      const messageText = input;

      startTransition(async () => {
        const { data } = await createChat();
        if (data?.id) {
          sessionStorage.setItem(`pending-message-${data.id}`, messageText);
          router.push(`/chat/${data.id}`);
        }
      });
      return;
    }

    sendMessage({ text: input });
    setInput("");
  };

  return (
    <SidebarProvider>
      <AppSidebar chats={chats} currentChatId={chatId} currentTitle={title} />
      <div className="max-h-screen h-screen flex flex-col w-full">
        <nav className="p-2 border-b flex items-center gap-2">
          <SidebarTrigger />
          {title && (
            <div className="text-sm text-muted-foreground">{title}</div>
          )}
        </nav>
        <div className="flex flex-col overflow-hidden relative h-full">
          <Messages messages={messages} status={status} />
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
