import { FC } from "react";
import { Conversation } from "../ai-elements/conversation";
import { ConversationContent } from "../ai-elements/conversation";
import { ConversationEmptyState } from "../ai-elements/conversation";
import { MessageSquareIcon } from "lucide-react";
import { Message } from "../ai-elements/message";
import { MessageContent } from "../ai-elements/message";
import { Response } from "../ai-elements/response";
import { cn } from "@/lib/utils";
import { MessageAvatar } from "../ai-elements/message";
import { ConversationScrollButton } from "../ai-elements/conversation";
import { ChatStatus, UIMessage } from "ai";
import { Loader } from "../ai-elements/loader";

interface MessagesProps {
  messages: UIMessage[];
  status: ChatStatus;
}

export const Messages: FC<MessagesProps> = ({ messages, status }) => {
  return (
    <Conversation className="relative size-full pb-4">
      <ConversationContent className="max-w-3xl mx-auto pb-44 flex flex-col items-center justify-center">
        {messages.length === 0 ? (
          <ConversationEmptyState
            icon={<MessageSquareIcon className="size-6" />}
            title="Start a chat with Akbar"
            description="Ask me everything about myself — technologies, experience, projects, and more!"
          />
        ) : (
          messages.map((message, index) => (
            <Message key={message.id} from={message.role}>
              <MessageContent variant="flat">
                {message.parts.map((part) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <Response
                          className={cn(
                            message.role === "assistant" ? "pl-1" : "pr-1"
                          )}
                          key={`${message.id}-${index}`}
                        >
                          {part.type === "text" ? part.text : ""}
                        </Response>
                      );
                  }
                })}
              </MessageContent>
              <MessageAvatar
                name={message.role === "user" ? "User" : "Assistant"}
                src={
                  message.role === "user" ? "https://github.com/shadcn.png" : ""
                }
              />
            </Message>
          ))
        )}
        {status === "submitted" && <Loader />}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
};
