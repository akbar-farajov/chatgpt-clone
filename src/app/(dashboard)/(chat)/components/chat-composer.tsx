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
import { FC, memo, useRef } from "react";
import { LanguageModelUsage } from "ai";
import { models } from "@/lib/ai/models";
import { ChatModelSelector } from "./chat-model-selector";
import { ChatContext } from "./chat-context";

interface PureChatComposerProps {
  onSubmit: (data: PromptInputMessage) => void;
  setInput: (input: string) => void;
  input: string;
  usage: LanguageModelUsage;
  isCreatingChat?: boolean;
  onModelChange?: (modelId: string) => void;
  selectedModel?: string;
}

export const PureChatComposer: FC<PureChatComposerProps> = ({
  setInput,
  input,
  onSubmit,
  usage,
  isCreatingChat = false,
  onModelChange,
  selectedModel,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const model = selectedModel || models[0].id;
  const { stop } = useChat();
  const chatStatus = useChatStatus();

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
          <ChatContext modelId={model} usage={usage} />
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
          <ChatModelSelector
            selectedModel={selectedModel}
            onModelChange={onModelChange}
          />
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

export const ChatComposer = memo(PureChatComposer, (prevProps, nextProps) => {
  if (prevProps.input !== nextProps.input) {
    return false;
  }
  if (prevProps.usage !== nextProps.usage) {
    return false;
  }
  if (prevProps.selectedModel !== nextProps.selectedModel) {
    return false;
  }

  return true;
});
