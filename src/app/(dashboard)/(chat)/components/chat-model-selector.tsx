"use client";
import { FC, useState } from "react";
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorName,
  ModelSelectorTrigger,
} from "@/components/ai-elements/model-selector";
import { PromptInputButton } from "@/components/ai-elements/prompt-input";
import { CheckIcon } from "lucide-react";
import { models } from "@/lib/ai/models";
import { saveChatModelAsCookie } from "@/actions/ai";

interface ChatModelSelectorProps {
  selectedModel?: string;
  onModelChange?: (modelId: string) => void;
}

export const ChatModelSelector: FC<ChatModelSelectorProps> = ({
  selectedModel,
  onModelChange,
}) => {
  const [modelSelectorOpen, setModelSelectorOpen] = useState(false);

  const model = selectedModel || models[0].id;
  const selectedModelData = models.find((m) => m.id === model);

  const handleModelChange = (newModelId: string) => {
    if (onModelChange) {
      onModelChange(newModelId);
    }
    saveChatModelAsCookie(newModelId);
    console.log("model saved to cookie", newModelId);
    setModelSelectorOpen(false);
  };

  return (
    <ModelSelector onOpenChange={setModelSelectorOpen} open={modelSelectorOpen}>
      <ModelSelectorTrigger asChild>
        <PromptInputButton>
          {selectedModelData?.provider && (
            <ModelSelectorLogo provider={selectedModelData.provider} />
          )}
          {selectedModelData?.name && (
            <ModelSelectorName>{selectedModelData.name}</ModelSelectorName>
          )}
        </PromptInputButton>
      </ModelSelectorTrigger>
      <ModelSelectorContent>
        <ModelSelectorInput placeholder="Search models..." />
        <ModelSelectorList>
          <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
          <ModelSelectorGroup heading="Available Models">
            {models.map((m) => (
              <ModelSelectorItem
                key={m.id}
                onSelect={() => handleModelChange(m.id)}
                value={m.id}
              >
                <ModelSelectorLogo provider={m.provider} />
                <ModelSelectorName>{m.name}</ModelSelectorName>
                {model === m.id ? (
                  <CheckIcon className="ml-auto size-4" />
                ) : (
                  <div className="ml-auto size-4" />
                )}
              </ModelSelectorItem>
            ))}
          </ModelSelectorGroup>
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  );
};
