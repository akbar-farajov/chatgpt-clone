import {
  deleteMessagesAfterRegenerate,
  generateTitleFromUserMessage,
  getChatById,
  getMessagesByChatId,
  saveMessage,
  updateChat,
} from "@/actions/chat";
import { google } from "@ai-sdk/google";
import {
  streamText,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  stepCountIs,
} from "ai";

import { getTools } from "@/tools";
import { SYSTEM_PROMPT } from "@/lib/prompts";
import { generateUUID } from "@/lib/utils";
import { ChatMessage } from "@/lib/types";
import {
  createUsage,
  checkDailyUsageLimit,
  updateDailyTokenCount,
} from "@/actions/usage";

const tools = getTools();

export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    message,
    id,
    trigger,
    messageId,
  }: {
    message: ChatMessage;
    id: string;
    trigger: "submit-message" | "regenerate-message";
    messageId: string;
  } = await req.json();

  const chat = await getChatById(id);
  switch (trigger) {
    case "submit-message": {
      if (!message) {
        throw new Error("message is required");
      }

      if (message.role === "user") {
        const { error } = await saveMessage(id, message);
        if (error) {
          throw error;
        }
      }
      break;
    }

    case "regenerate-message": {
      if (!messageId) {
        throw new Error("messageId is required");
      }

      const { error } = await deleteMessagesAfterRegenerate(id, messageId);
      if (error) {
        throw new Error(error);
      }

      break;
    }

    default: {
      throw new Error(`Trigger '${trigger}' is not supported`);
    }
  }
  const usageCheck = await checkDailyUsageLimit();
  if (usageCheck.error) {
    return new Response(
      JSON.stringify({ error: "Failed to check usage limit" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  if (usageCheck.data?.isLimitExceeded) {
    return new Response(JSON.stringify("Daily token limit exceeded"), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages = await getMessagesByChatId(id);
  if (!messages) {
    return new Response("No messages found", { status: 404 });
  }

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const result = streamText({
        model: google("gemini-2.5-flash-lite"),
        system: SYSTEM_PROMPT,
        messages: convertToModelMessages(messages),
        tools,

        stopWhen: stepCountIs(10),
        async onFinish({ usage }) {
          await createUsage({
            chatId: id,
            usage,
            modelId: "google:gemini-2.5-flash-lite",
          });

          const totalTokens = usage.totalTokens || 0;

          await updateDailyTokenCount(totalTokens);

          if (!chat?.title && message) {
            const title = await generateTitleFromUserMessage({ message });
            await updateChat(id, { title });
            writer.write({
              type: "data-title",
              data: title,
              transient: true,
            });
          }
          writer.write({
            type: "data-usage",
            data: usage,
          });
        },
      });

      writer.merge(
        result.toUIMessageStream({
          generateMessageId: generateUUID,
          async onFinish({ responseMessage }) {
            await saveMessage(id, responseMessage as ChatMessage);
          },
        })
      );
    },
    generateId: generateUUID,
  });
  return createUIMessageStreamResponse({
    stream,
  });
}
