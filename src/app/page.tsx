"use client";
import React, { useState } from "react";
import { useChat } from "@ai-sdk/react";

import { Messages } from "@/components/chat/messages";
import { ChatComposer } from "@/components/chat/chat-composer";

const Chat = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop } = useChat();

  return (
    <div
      className="flex flex-col overflow-hidden relative"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
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
