"use client";

import { FC, useState } from "react";
import {
  CheckIcon,
  CopyIcon,
  PaperclipIcon,
  RefreshCcwIcon,
} from "lucide-react";
import Image from "next/image";
import { Message } from "../ai-elements/message";
import { MessageContent } from "../ai-elements/message";
import { Response } from "../ai-elements/response";
import { Action } from "../ai-elements/actions";
import { Actions } from "../ai-elements/actions";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "../ai-elements/tool";
import { ChatMessage } from "@/app/api/chat/route";

interface AIMessageProps {
  message: ChatMessage;
  index: number;
}

export const AIMessage: FC<AIMessageProps> = ({ message, index }) => {
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
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("\n");

  return (
    <Message
      key={message.id}
      from={message.role}
      className="flex flex-col gap-2"
    >
      <MessageContent variant="flat">
        {message.parts.map((part) => {
          switch (part.type) {
            case "text":
              return (
                <Response key={`${message.id}-${index}-text`}>
                  {part.text}
                </Response>
              );
            case "tool-getWeather":
              return (
                <Tool key={`${message.id}-${index}-tool-getWeather`}>
                  <ToolHeader type={part.type} state={part.state} />
                  <ToolContent>
                    <ToolInput input={part.input} />
                    {part.state === "output-available" && (
                      <ToolOutput
                        errorText={part.errorText}
                        output={part.output}
                      />
                    )}
                  </ToolContent>
                </Tool>
              );
            case "file":
              if (part.mediaType.startsWith("image/")) {
                return (
                  <Image
                    key={`${message.id}-${index}-image`}
                    src={part.url}
                    alt={part.filename || "File"}
                    width={100}
                    height={100}
                  />
                );
              }
              return (
                <div
                  key={`${message.id}-${index}-file`}
                  className="flex items-center gap-2"
                >
                  <PaperclipIcon className="size-4" />
                  {part.filename || "File"}
                </div>
              );
          }
        })}
      </MessageContent>
      <Actions className="flex justify-start w-full">
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
          label="Regenerate"
          tooltip="Regenerate message"
          variant="ghost"
          onClick={handleEdit}
        >
          <RefreshCcwIcon className="size-4" />
        </Action>
      </Actions>
    </Message>
  );
};
