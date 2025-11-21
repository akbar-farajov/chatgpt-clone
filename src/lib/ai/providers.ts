import { createProviderRegistry, customProvider, gateway } from "ai";

export const providers = createProviderRegistry({
  google: customProvider({
    languageModels: {
      "gemini-2.5-flash-lite": gateway.languageModel(
        "google/gemini-2.5-flash-lite"
      ),
    },
  }),
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
