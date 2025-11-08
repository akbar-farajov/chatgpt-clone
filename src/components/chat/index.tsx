"use client";
import { FC, useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { Messages } from "@/components/chat/messages";
import { ChatComposer } from "@/components/chat/chat-composer";
import { DefaultChatTransport } from "ai";
import type { Profile } from "@/lib/types";
import { createChat } from "@/actions/chat";
import { useRouter } from "next/navigation";
import { PromptInputMessage } from "../ai-elements/prompt-input";
import { ChatMessage } from "@/app/api/chat/route";

interface ChatProps {
  chatId?: string;
  initialMessages: ChatMessage[];
  initialTitle?: string | null;
  profile: Profile | null;
}

const Chat: FC<ChatProps> = ({
  chatId: initialChatId,
  initialMessages,
  initialTitle,
  profile,
}) => {
  const router = useRouter();
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    initialChatId
  );
  const [title, setTitle] = useState<string | undefined>(
    initialTitle || undefined
  );
  const [input, setInput] = useState("");
  const pendingMessageRef = useRef<PromptInputMessage | null>(null);

  const { messages, sendMessage, status, stop } = useChat<ChatMessage>({
    id: currentChatId,
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
    onFinish() {
      if (currentChatId && !initialChatId) {
        router.push(`/chat/${currentChatId}`);
      }
    },
  });

  useEffect(() => {
    if (currentChatId && pendingMessageRef.current) {
      const message = pendingMessageRef.current;
      pendingMessageRef.current = null;
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
      <Messages messages={messages} status={status} profile={profile} />
      <ChatComposer
        onSubmit={handleSubmit}
        onStop={stop}
        setInput={setInput}
        input={input}
        status={status}
      />
    </>
  );
};

export default Chat;
