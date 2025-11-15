"use client";
import { useChatStatus, useChat } from "@ai-sdk-tools/store";
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTools,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputActionAddAttachments,
  PromptInputAttachments,
  PromptInputAttachment,
  PromptInputMessage,
} from "@/components/ai-elements/prompt-input";

import { FC, useRef } from "react";
import {
  Context,
  ContextCacheUsage,
  ContextReasoningUsage,
  ContextContentBody,
  ContextOutputUsage,
  ContextInputUsage,
  ContextContentHeader,
  ContextContent,
  ContextTrigger,
  ContextContentFooter,
} from "@/components/ai-elements/context";
import { LanguageModelUsage } from "ai";

interface ChatComposerProps {
  onSubmit: (data: PromptInputMessage) => void;
  setInput: (input: string) => void;
  input: string;
  usage: LanguageModelUsage;
  isCreatingChat?: boolean;
}
export const ChatComposer: FC<ChatComposerProps> = ({
  setInput,
  input,
  onSubmit,
  usage,
  isCreatingChat = false,
}) => {
  const { stop } = useChat();
  const chatStatus = useChatStatus();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <PromptInput
      onSubmit={onSubmit}
      multiple={true}
      className="mt-4 w-full max-w-3xl mx-auto mb-4 p-2 shadow-xs bg-background rounded-lg border-none"
    >
      <PromptInputBody className="w-full flex flex-row items-center justify-between">
        <div className="flex w-full flex-col items-start justify-start">
          <PromptInputAttachments>
            {(attachment) => <PromptInputAttachment data={attachment} />}
          </PromptInputAttachments>
          <PromptInputTextarea
            onChange={(e) => setInput(e.currentTarget.value)}
            value={input}
            ref={textareaRef}
          />
        </div>
        <div className="flex w-max items-center justify-center">
          <Context
            maxTokens={128_000}
            // modelId="openai:gpt-5"
            usage={usage}
            usedTokens={usage?.totalTokens ?? 0}
          >
            <ContextTrigger className="pr-4 cursor-pointer" />
            <ContextContent>
              <ContextContentHeader />
              <ContextContentBody>
                <ContextInputUsage />
                <ContextOutputUsage />
                <ContextReasoningUsage />
                <ContextCacheUsage />
              </ContextContentBody>
              <ContextContentFooter />
            </ContextContent>
          </Context>
        </div>
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger />
            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>
        </PromptInputTools>
        <PromptInputSubmit
          disabled={!input.trim() && chatStatus !== "streaming"}
          status={isCreatingChat ? "submitted" : chatStatus}
          onStop={() => stop()}
        />
      </PromptInputFooter>
    </PromptInput>
  );
};
