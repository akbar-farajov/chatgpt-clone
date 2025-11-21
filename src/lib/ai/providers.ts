import { createProviderRegistry, customProvider, gateway } from "ai";

export const providers = createProviderRegistry({
  openai: customProvider({
    languageModels: {
      "gpt-4o-mini": gateway.languageModel("openai/gpt-4o-mini"),
    },
  }),
  cheapest: customProvider({
    languageModels: {
      "longcat-flash-chat": gateway.languageModel("meituan/longcat-flash-chat"),
    },
  }),
  mistral: customProvider({
    languageModels: {
      "mistral-large": gateway.languageModel("mistral/ministral-3b"),
    },
  }),
});
