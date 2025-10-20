import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputButton,
} from "../ai-elements/prompt-input";

import { ChatStatus } from "ai";
import { GlobeIcon } from "lucide-react";
import { FC } from "react";

interface ChatComposerProps {
  onSubmit: () => void;
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
  return (
    <PromptInput
      onSubmit={onSubmit}
      className="mt-4 absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl p-2 mb-4 md:mb-8 shadow-xs bg-background rounded-lg"
    >
      <PromptInputBody>
        <PromptInputTextarea
          onChange={(e) => setInput(e.currentTarget.value)}
          value={input}
        />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputButton>
          <GlobeIcon size={16} />
          <span>Search</span>
        </PromptInputButton>
        <PromptInputSubmit
          disabled={!input.trim() && status !== "streaming"}
          status={status}
          onStop={onStop}
        />
      </PromptInputFooter>
    </PromptInput>
  );
};
