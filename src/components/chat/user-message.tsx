"use client";

import { FC, useState } from "react";
import { CopyIcon, CheckIcon, PencilIcon } from "lucide-react";
import { Message } from "../ai-elements/message";
import { MessageContent } from "../ai-elements/message";
import { Response } from "../ai-elements/response";
import { Action } from "../ai-elements/actions";
import { Actions } from "../ai-elements/actions";
import { ChatMessage } from "@/app/api/chat/route";

interface UserMessageProps {
  message: ChatMessage;
  index: number;
}

export const UserMessage: FC<UserMessageProps> = ({ message, index }) => {
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
    // TODO: Implement edit functionality
    console.log("Edit functionality not yet implemented");
  };

  const textContent = message.parts
    .filter((part) => part.type === "text")
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("\n");

  return (
    <Message
      key={message.id}
      from={message.role}
      className="group flex flex-col gap-2"
    >
      <MessageContent variant="flat">
        {message.parts.map((part) => {
          if (part.type === "text") {
            return (
              <Response key={`${message.id}-${index}-text`}>
                {part.text}
              </Response>
            );
          }
          return null;
        })}
      </MessageContent>
      <Actions className="flex justify-end w-full opacity-0 group-hover:opacity-100 transition-opacity">
        <Action
          label="Copy"
          tooltip="Copy message"
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
          tooltip="Edit message"
          variant="ghost"
          onClick={handleEdit}
        >
          <PencilIcon className="size-4" />
        </Action>
      </Actions>
    </Message>
  );
};
