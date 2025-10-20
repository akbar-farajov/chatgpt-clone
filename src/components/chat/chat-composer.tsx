import React, { FormEvent } from "react";
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

type ChatComposerProps = {
  onSubmit: () => void;
  onStop: () => void;
  setInput: (input: string) => void;
  input: string;
  // suggestions: string[];
  // handleSuggestionClick: (suggestion: string) => void;
  status: ChatStatus;
};
export const ChatComposer = ({
  setInput,
  input,
  // suggestions,
  // handleSuggestionClick,
  status,
  onSubmit,
  onStop,
}: ChatComposerProps) => {
  return (
    <PromptInput
      onSubmit={onSubmit}
      className="mt-4 fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl p-2 mb-4 shadow-xs bg-background rounded-lg"
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
        {/* <Suggestions>
          {suggestions.map((suggestion) => (
            <Suggestion
              disabled={status === "streaming" || status === "submitted"}
              key={suggestion}
              onClick={handleSuggestionClick}
              suggestion={suggestion}
            />
          ))}
        </Suggestions> */}
        <PromptInputSubmit
          disabled={!input.trim() && status !== "streaming"}
          status={status}
          onStop={onStop}
        />
      </PromptInputFooter>
    </PromptInput>
  );
};
