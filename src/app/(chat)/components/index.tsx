"use client";
import { FC, useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { Messages } from "@/app/(chat)/components/messages";
import { ChatComposer } from "@/app/(chat)/components/chat-composer";
import { DefaultChatTransport } from "ai";
import type { Profile } from "@/lib/types";
import { createChat } from "@/actions/chat";
import { useRouter } from "next/navigation";
import { PromptInputMessage } from "../../../components/ai-elements/prompt-input";
import { ChatMessage } from "@/app/api/chat/route";

interface ChatProps {
  chatId?: string;
  initialMessages: ChatMessage[];
  profile?: Profile;
}

const Chat: FC<ChatProps> = ({
  chatId: initialChatId,
  initialMessages,
  profile,
}) => {
  const router = useRouter();
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    initialChatId
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
