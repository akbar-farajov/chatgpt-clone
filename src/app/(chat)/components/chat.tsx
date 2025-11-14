"use client";
import { FC, useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk-tools/store";
import { Messages } from "@/app/(chat)/components/messages";
import { ChatComposer } from "@/app/(chat)/components/chat-composer";
import { DefaultChatTransport, LanguageModelUsage } from "ai";
import type { Profile } from "@/lib/types";
import { createChat } from "@/actions/chat";
import { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { ChatMessage } from "@/lib/types";
import { generateUUID } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

interface ChatProps {
  chatId?: string;
  initialMessages?: ChatMessage[];
  profile?: Profile;
  usage?: LanguageModelUsage;
}

export const Chat: FC<ChatProps> = ({
  chatId: initialChatId,
  initialMessages = [],
  profile,
  usage,
}) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    initialChatId
  );

  const [input, setInput] = useState("");
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  const pendingMessageRef = useRef<PromptInputMessage | null>(null);
  const hasSentPendingMessage = useRef(false);

  // Sync currentChatId with initialChatId when it changes (e.g., navigating to home page)
  useEffect(() => {
    setCurrentChatId(initialChatId);
    // Reset the flag when chatId changes to allow sending pending message for new chat
    hasSentPendingMessage.current = false;
  }, [initialChatId]);

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
        mutate("/api/chats");
      }
    },
  });

  useEffect(() => {
    if (initialChatId && !hasSentPendingMessage.current) {
      const pendingMessageStr = sessionStorage.getItem("pendingMessage");
      if (pendingMessageStr) {
        try {
          const message = JSON.parse(pendingMessageStr) as PromptInputMessage;
          sessionStorage.removeItem("pendingMessage");
          hasSentPendingMessage.current = true;
          sendMessage({ text: message.text || "", files: message.files || [] });
        } catch (e) {
          console.error("Failed to parse pending message:", e);
          sessionStorage.removeItem("pendingMessage");
        }
      }
    }
  }, [initialChatId, sendMessage]);

  useEffect(() => {
    if (currentChatId && pendingMessageRef.current && !initialChatId) {
      const message = pendingMessageRef.current;
      pendingMessageRef.current = null;
      router.push(`/chat/${currentChatId}`);
      sessionStorage.setItem("pendingMessage", JSON.stringify(message));
    }
  }, [currentChatId, initialChatId, router]);

  const handleSubmit = async (data: PromptInputMessage) => {
    const hasText = Boolean(data.text?.trim());
    const hasFiles = (data.files?.length ?? 0) > 0;

    if (!hasText && !hasFiles) {
      return;
    }

    if (!currentChatId) {
      setIsCreatingChat(true);
      pendingMessageRef.current = data;
      const chatId = generateUUID();
      const result = await createChat({ chatId });
      if (result.data?.id) {
        setCurrentChatId(result.data.id);
        mutate("/api/chats");
      }
      setIsCreatingChat(false);
      return;
    }

    sendMessage({ text: data.text || "", files: data.files || [] });
    setInput("");
  };

  return (
    <>
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
