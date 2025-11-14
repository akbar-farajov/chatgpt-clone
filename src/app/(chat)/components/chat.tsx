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
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    initialChatId
  );

  const [input, setInput] = useState("");
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  const pendingMessageRef = useRef<PromptInputMessage | null>(null);

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
        router.refresh();
      }
    },
  });

  useEffect(() => {
    if (currentChatId && pendingMessageRef.current) {
      const message = pendingMessageRef.current;
      pendingMessageRef.current = null;
      window.history.replaceState({}, "", `/chat/${currentChatId}`);
      sendMessage({ text: message.text || "", files: message.files || [] });
      setInput("");
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
      pendingMessageRef.current = data;
      const chatId = generateUUID();
      const result = await createChat({ chatId });
      if (result.data?.id) {
        setCurrentChatId(result.data.id);
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
