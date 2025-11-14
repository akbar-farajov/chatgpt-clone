import { tool } from "ai";
import { z } from "zod";
import { experimental_generateImage as generateImage } from "ai";
import { openai } from "@ai-sdk/openai";

export const imageGeneration = tool({
  description: "Generate an image based on a prompt",
  inputSchema: z.object({
    prompt: z.string().describe("The prompt to generate an image from"),
  }),
  execute: async ({ prompt }) => {
    const { image } = await generateImage({
      model: openai.image("dall-e-3"),
      prompt,
      size: "1024x1024",
      maxImagesPerCall: 1,
      providerOptions: {
        openai: {
          style: "vivid",
          quality: "hd",
        },
      },
    });
    return image.base64;
  },
});
