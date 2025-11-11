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

interface ChatComposerProps {
  onSubmit: (data: PromptInputMessage) => void;
  setInput: (input: string) => void;
  input: string;
}
export const ChatComposer: FC<ChatComposerProps> = ({
  setInput,
  input,
  onSubmit,
}) => {
  const { stop } = useChat();
  const chatStatus = useChatStatus();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <PromptInput
      onSubmit={onSubmit}
      multiple={true}
      className="mt-4 w-full max-w-3xl mx-auto mb-4 p-2 shadow-xs bg-background rounded-lg"
    >
      <PromptInputBody>
        <PromptInputAttachments>
          {(attachment) => <PromptInputAttachment data={attachment} />}
        </PromptInputAttachments>
        <PromptInputTextarea
          onChange={(e) => setInput(e.currentTarget.value)}
          value={input}
          ref={textareaRef}
        />
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
          status={chatStatus}
          onStop={() => stop()}
        />
      </PromptInputFooter>
    </PromptInput>
  );
};
