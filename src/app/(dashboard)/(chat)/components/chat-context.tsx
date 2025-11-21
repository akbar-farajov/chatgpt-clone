"use client";
import { FC, memo } from "react";
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

interface PureChatContextProps {
  modelId: string;
  usage: LanguageModelUsage;
  maxTokens?: number;
}

export const PureChatContext: FC<PureChatContextProps> = ({
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

export const ChatContext = memo(PureChatContext, (prevProps, nextProps) => {
  if (prevProps.modelId !== nextProps.modelId) {
    return false;
  }
  if (prevProps.usage !== nextProps.usage) {
    return false;
  }
  if (prevProps.maxTokens !== nextProps.maxTokens) {
    return false;
  }
  return true;
});
