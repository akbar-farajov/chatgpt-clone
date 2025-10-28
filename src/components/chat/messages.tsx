import { FC } from "react";
import { Conversation } from "../ai-elements/conversation";
import { ConversationContent } from "../ai-elements/conversation";
import { ConversationEmptyState } from "../ai-elements/conversation";
import { MessageSquareIcon, PaperclipIcon } from "lucide-react";
import { Message } from "../ai-elements/message";
import { MessageContent } from "../ai-elements/message";
import { Response } from "../ai-elements/response";
import { ConversationScrollButton } from "../ai-elements/conversation";
import { ChatStatus } from "ai";
import { Loader } from "../ai-elements/loader";
import Image from "next/image";
import { Shimmer } from "../ai-elements/shimmer";

import { Profile } from "@/lib/types";
import { ChatMessage } from "@/app/api/chat/route";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "../ai-elements/tool";

interface MessagesProps {
  messages: ChatMessage[];
  status: ChatStatus;
  profile: Profile | null;
}

export const Messages: FC<MessagesProps> = ({ messages, status, profile }) => {
  return (
    <Conversation className="relative size-full mb-44 scroll-smooth">
      <ConversationContent className="max-w-3xl mx-auto">
        {messages.length === 0 ? (
          <ConversationEmptyState
            icon={<MessageSquareIcon className="size-6" />}
            title={`How can I help, ${profile?.full_name || "User"}?`}
            description={`Ask me anything about the documents you upload.`}
          />
        ) : (
          messages.map((message, index) => (
            <Message key={message.id} from={message.role}>
              <MessageContent variant="flat">
                {message.parts.map((part) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <Response key={`${message.id}-${index}-text`}>
                          {part.type === "text" ? part.text : ""}
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
            </Message>
          ))
        )}
        {status === "submitted" && (
          <Shimmer duration={1}>Generating your response...</Shimmer>
        )}
        {status === "streaming" && <Loader />}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
};
