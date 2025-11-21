"use client";
import { FC, useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk-tools/store";
import { Messages } from "@/app/(dashboard)/(chat)/components/messages";
import { ChatComposer } from "@/app/(dashboard)/(chat)/components/chat-composer";
import { DefaultChatTransport, LanguageModelUsage } from "ai";
import type { Profile } from "@/lib/types";
import { createChat } from "@/actions/chat";
import { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { ChatMessage } from "@/lib/types";
import { generateUUID } from "@/lib/utils";
import { toast } from "sonner";
import { mutate } from "swr";
import { getChatHistoryKey } from "@/hooks/use-chats";
import { Header } from "@/app/(dashboard)/components";
import { ChatBreadcrumb } from "./chat-breadcrumb";
import { useRouter } from "next/navigation";

interface ChatProps {
  chatId?: string;
  initialMessages?: ChatMessage[];
  profile?: Profile;
  usage?: LanguageModelUsage;
  chatTitle?: string;
}

export const Chat: FC<ChatProps> = ({
  chatId: initialChatId,
  initialMessages = [],
  profile,
  usage,
  chatTitle,
}) => {
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    initialChatId
  );
  const [input, setInput] = useState("");
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [title, setTitle] = useState(chatTitle);
  const router = useRouter();
  const pendingMessageKey = "pending-chat-message";

  const { sendMessage } = useChat<ChatMessage>({
    id: currentChatId,
    messages: initialMessages,
    generateId: generateUUID,
    transport: new DefaultChatTransport({
      prepareSendMessagesRequest(request) {
        const { id, messages, body, trigger, messageId } = request as any;

        switch (trigger) {
          case "submit-message": {
            return {
              body: {
                id,
                trigger,
                message: messages.at(-1),
                ...body,
              },
            };
          }
          case "regenerate-message": {
            return {
              body: {
                id,
                trigger,
                messageId,
                ...body,
              },
            };
          }
          default: {
            return {
              body: {
                id,
                trigger,
                ...body,
              },
            };
          }
        }
      },
    }),

    onData(event) {
      if (event.type === "data-usage") {
        console.log((event.data as LanguageModelUsage).outputTokens);
      }
      if (event.type === "data-title") {
        setTitle(event.data as string);
        mutate(getChatHistoryKey());
      }
    },
    onError(error) {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred while processing your message");
      }
    },
  });
  useEffect(() => {
    if (currentChatId) {
      const pending = sessionStorage.getItem(pendingMessageKey);
      if (pending) {
        sessionStorage.removeItem(pendingMessageKey);
        const message = JSON.parse(pending) as PromptInputMessage;
        sendMessage({ text: message.text || "", files: message.files || [] });
      }
    }
  }, [currentChatId, sendMessage]);

  const handleSubmit = async (data: PromptInputMessage) => {
    const hasText = Boolean(data.text?.trim());
    const hasFiles = (data.files?.length ?? 0) > 0;

    if (!hasText && !hasFiles) {
      return;
    }

    if (!currentChatId) {
      setIsCreatingChat(true);

      // Store message for after navigation
      sessionStorage.setItem(pendingMessageKey, JSON.stringify(data));

      const chatId = generateUUID();
      const result = await createChat({ chatId });

      if (result.data?.id) {
        mutate(getChatHistoryKey());
        // Use router.push for proper Next.js navigation
        // This will remount the Provider on the new page
        router.push(`/chat/${result.data.id}`);
      }

      setIsCreatingChat(false);
      return;
    }

    sendMessage({ text: data.text || "", files: data.files || [] });
    setInput("");
  };

  return (
    <>
      <Header leftContent={<ChatBreadcrumb chatTitle={title} />} />
      <Messages profile={profile} />
      <ChatComposer
        onSubmit={handleSubmit}
        setInput={setInput}
        input={input}
        usage={usage as LanguageModelUsage}
        isCreatingChat={isCreatingChat}
      />
    </>
  );
};
