"use client";
import { FC, useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk-tools/store";
import { Messages } from "@/app/(chat)/components/messages";
import { ChatComposer } from "@/app/(chat)/components/chat-composer";
import { DefaultChatTransport } from "ai";
import type { Profile } from "@/lib/types";
import { createChat } from "@/actions/chat";
import { useRouter } from "next/navigation";
import { PromptInputMessage } from "../../../components/ai-elements/prompt-input";
import { ChatMessage } from "@/app/(chat)/api/chat/route";
import { generateUUID } from "@/lib/utils";

interface ChatProps {
  chatId?: string;
  initialMessages?: ChatMessage[];
  profile?: Profile;
}

const Chat: FC<ChatProps> = ({
  chatId: initialChatId,
  initialMessages = [],
  profile,
}) => {
  const router = useRouter();
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    initialChatId
  );

  const [input, setInput] = useState("");
  const pendingMessageRef = useRef<PromptInputMessage | null>(null);

  const { messages, sendMessage } = useChat<ChatMessage>({
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

    onFinish() {
      if (messages.length === 0) {
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
      pendingMessageRef.current = data;
      const result = await createChat();
      if (result.data?.id) {
        setCurrentChatId(result.data.id);
      }
      return;
    }

    sendMessage({ text: data.text || "", files: data.files || [] });
    setInput("");
  };

  return (
    <>
      <Messages profile={profile} />
      <ChatComposer onSubmit={handleSubmit} setInput={setInput} input={input} />
    </>
  );
};

export default Chat;
