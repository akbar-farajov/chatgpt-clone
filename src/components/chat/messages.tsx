import { FC } from "react";
import { Conversation } from "../ai-elements/conversation";
import { ConversationContent } from "../ai-elements/conversation";
import { ConversationEmptyState } from "../ai-elements/conversation";
import { MessageSquareIcon } from "lucide-react";
import { ConversationScrollButton } from "../ai-elements/conversation";
import { ChatStatus } from "ai";
import { Loader } from "../ai-elements/loader";
import { Shimmer } from "../ai-elements/shimmer";
import { Profile } from "@/lib/types";
import { ChatMessage } from "@/app/api/chat/route";
import { AIMessage } from "./ai-message";
import { UserMessage } from "./user-message";

interface MessagesProps {
  messages: ChatMessage[];
  status: ChatStatus;
  profile: Profile | null;
}

export const Messages: FC<MessagesProps> = ({ messages, status, profile }) => {
  return (
    <Conversation className="relative size-full flex-1 scroll-smooth">
      <ConversationContent className="max-w-3xl mx-auto">
        {messages.length === 0 ? (
          <ConversationEmptyState
            icon={<MessageSquareIcon className="size-6" />}
            title={`How can I help, ${profile?.full_name || "User"}?`}
            description={`Ask me anything about the documents you upload.`}
          />
        ) : (
          messages.map((message, index) => {
            if (message.role === "user") {
              return (
                <UserMessage key={message.id} message={message} index={index} />
              );
            }
            return (
              <AIMessage key={message.id} message={message} index={index} />
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
