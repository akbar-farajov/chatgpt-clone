"use client";
import { FC, useState } from "react";
import { UIMessage, useChat } from "@ai-sdk/react";

import { Messages } from "@/components/chat/messages";
import { ChatComposer } from "@/components/chat/chat-composer";
import { DefaultChatTransport } from "ai";

interface ChatProps {
  chatId: string;
  initialMessages: UIMessage[];
}

const Chat: FC<ChatProps> = ({ chatId, initialMessages }) => {
  const [input, setInput] = useState("");
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
  });

  return (
    <div
      className="flex flex-col overflow-hidden relative h-full"
      //   style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <Messages messages={messages} status={status} />
      <ChatComposer
        onSubmit={() => {
          const hasText = Boolean(input.trim());
          if (!hasText) {
            return;
          }

          sendMessage({ text: input });
          setInput("");
        }}
        onStop={stop}
        setInput={setInput}
        input={input}
        status={status}
      />
    </div>
  );
};

export default Chat;
