import { FC } from "react";
import { Conversation } from "../../../components/ai-elements/conversation";
import { ConversationContent } from "../../../components/ai-elements/conversation";
import { ConversationEmptyState } from "../../../components/ai-elements/conversation";
import { MessageSquareIcon } from "lucide-react";
import { ConversationScrollButton } from "../../../components/ai-elements/conversation";
import { ChatStatus } from "ai";
import { Loader } from "../../../components/ai-elements/loader";
import { Shimmer } from "../../../components/ai-elements/shimmer";
import { Profile } from "@/lib/types";
import { ChatMessage } from "@/app/api/chat/route";
import { AIMessage } from "./ai-message";
import { UserMessage } from "./user-message";

interface MessagesProps {
  messages: ChatMessage[];
  status: ChatStatus;
  profile?: Profile;
}

export const Messages: FC<MessagesProps> = ({ messages, status, profile }) => {
  const isLastMessageStreaming = (index: number) => {
    return (
      index === messages.length - 1 &&
      (status === "streaming" || status === "submitted")
    );
  };

  return (
    <Conversation className="w-full flex-1 scroll-smooth">
      <ConversationContent className="max-w-3xl mx-auto">
        {messages.length === 0 ? (
          <ConversationEmptyState
            icon={<MessageSquareIcon className="size-6" />}
            title={`How can I help, ${profile?.full_name ?? "User"}?`}
            description={`Ask me anything about the documents you upload.`}
          />
        ) : (
          messages.map((message, index) => {
            const key = `${message.role}-${message.id || index}-${index}`;
            if (message.role === "user") {
              return <UserMessage key={key} message={message} index={index} />;
            }
            return (
              <AIMessage
                key={key}
                message={message}
                index={index}
                isStreaming={isLastMessageStreaming(index)}
              />
            );
          })
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
