import { FC } from "react";
import { Conversation } from "../../../components/ai-elements/conversation";
import { ConversationContent } from "../../../components/ai-elements/conversation";
import { ConversationEmptyState } from "../../../components/ai-elements/conversation";
import { MessageSquareIcon } from "lucide-react";
import { ConversationScrollButton } from "../../../components/ai-elements/conversation";
import { Loader } from "../../../components/ai-elements/loader";
import { Shimmer } from "../../../components/ai-elements/shimmer";
import { Profile } from "@/lib/types";
import { ChatMessage } from "@/app/(chat)/api/chat/route";
import { AIMessage } from "./ai-message";
import { UserMessage } from "./user-message";
import { useChatMessages, useChatStatus } from "@ai-sdk-tools/store";

interface MessagesProps {
  profile?: Profile;
}

export const Messages: FC<MessagesProps> = ({ profile }) => {
  const chatStatus = useChatStatus();
  const messages = useChatMessages<ChatMessage>();

  const isLastMessageStreaming = (index: number) => {
    return (
      index === messages.length - 1 &&
      (chatStatus === "streaming" || chatStatus === "submitted")
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
              return <UserMessage key={key} message={message} />;
            }
            return (
              <AIMessage
                key={key}
                message={message}
                isStreaming={isLastMessageStreaming(index)}
              />
            );
          })
        )}
        {chatStatus === "submitted" && (
          <Shimmer duration={1}>Generating your response...</Shimmer>
        )}
        {chatStatus === "streaming" && <Loader />}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
};
