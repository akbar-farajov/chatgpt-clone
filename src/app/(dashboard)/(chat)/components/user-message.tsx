"use client";

import { FC, useState } from "react";
import { CopyIcon, CheckIcon, PencilIcon } from "lucide-react";
import { Message } from "@/components/ai-elements/message";
import { MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { Action } from "@/components/ai-elements/actions";
import { Actions } from "@/components/ai-elements/actions";
import { ChatMessage } from "@/lib/types";
import Image from "next/image";

interface UserMessageProps {
  message: ChatMessage;
}

export const UserMessage: FC<UserMessageProps> = ({ message }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const handleEdit = () => {
    console.log("Edit functionality not yet implemented");
  };

  const textContent = message.parts
    .filter((part) => part.type === "text")
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("\n");

  return (
    <Message from={message.role} className="group flex flex-col gap-2">
      {message.parts.map((part, partIndex) => {
        switch (part.type) {
          case "text":
            return (
              <MessageContent
                variant="flat"
                key={`${message.id}-${partIndex}-text`}
              >
                <Response>{part.text}</Response>
              </MessageContent>
            );
          case "file":
            if (part.mediaType.startsWith("image/")) {
              return (
                <MessageContent
                  variant="flat"
                  key={`${message.id}-${partIndex}-image`}
                >
                  <Image
                    key={`${message.id}-${partIndex}-image`}
                    src={part.url}
                    alt={part.filename || "File"}
                    width={100}
                    height={100}
                  />
                </MessageContent>
              );
            }
            return (
              <div key={`${message.id}-${partIndex}-file`}>{part.filename}</div>
            );
        }
      })}
      <Actions className="flex justify-end w-full opacity-0 group-hover:opacity-100 transition-opacity">
        <Action
          label="Copy"
          tooltip="Copy"
          variant="ghost"
          onClick={() => handleCopy(textContent, message.id)}
        >
          {copiedId === message.id ? (
            <CheckIcon className="size-4" />
          ) : (
            <CopyIcon className="size-4" />
          )}
        </Action>
        <Action
          label="Edit"
          tooltip="Edit"
          variant="ghost"
          onClick={handleEdit}
          disabled
        >
          <PencilIcon className="size-4" />
        </Action>
      </Actions>
    </Message>
  );
};
