"use client";
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputButton,
  PromptInputSpeechButton,
  PromptInputTools,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputActionAddAttachments,
  PromptInputAttachments,
  PromptInputAttachment,
  PromptInputMessage,
} from "../ai-elements/prompt-input";

import { ChatStatus } from "ai";
import { GlobeIcon } from "lucide-react";
import { FC, useRef } from "react";

interface ChatComposerProps {
  onSubmit: (data: PromptInputMessage) => void;
  onStop: () => void;
  setInput: (input: string) => void;
  input: string;
  status: ChatStatus;
}
export const ChatComposer: FC<ChatComposerProps> = ({
  setInput,
  input,
  status,
  onSubmit,
  onStop,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <PromptInput
      onSubmit={onSubmit}
      multiple={true}
      className="mt-4 absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl p-2 mb-4 md:mb-8 shadow-xs bg-background rounded-lg"
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
          <PromptInputSpeechButton
            onTranscriptionChange={setInput}
            textareaRef={textareaRef}
          />
          <PromptInputButton>
            <GlobeIcon size={16} />
            <span>Search</span>
          </PromptInputButton>
          {/* <PromptInputModelSelect onValueChange={setModel} value={model}>
            <PromptInputModelSelectTrigger>
              <PromptInputModelSelectValue />
            </PromptInputModelSelectTrigger>
            <PromptInputModelSelectContent>
              {models.map((modelOption) => (
                <PromptInputModelSelectItem
                  key={modelOption.id}
                  value={modelOption.id}
                >
                  {modelOption.name}
                </PromptInputModelSelectItem>
              ))}
            </PromptInputModelSelectContent>
          </PromptInputModelSelect> */}
        </PromptInputTools>
        <PromptInputSubmit
          disabled={!input.trim() && status !== "streaming"}
          status={status}
          onStop={onStop}
        />
      </PromptInputFooter>
    </PromptInput>
  );
};
