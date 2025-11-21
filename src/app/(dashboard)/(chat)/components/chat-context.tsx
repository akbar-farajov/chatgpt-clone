"use client";
import { FC } from "react";
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

interface ChatContextProps {
  modelId: string;
  usage: LanguageModelUsage;
  maxTokens?: number;
}

export const ChatContext: FC<ChatContextProps> = ({
  modelId,
  usage,
  maxTokens = 128_000,
}) => {
  return (
    <Context
      maxTokens={maxTokens}
      modelId={modelId}
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
  );
};
