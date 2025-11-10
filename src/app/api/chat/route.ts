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
  UIMessage,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  InferUITools,
  UIDataTypes,
  stepCountIs,
} from "ai";

import { getTools } from "@/tools";
import { SYSTEM_PROMPT } from "@/lib/prompts";
import { generateUUID } from "@/lib/utils";

const tools = getTools();

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

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

  const messages = await getMessagesByChatId(id);
  if (!messages) {
    return new Response("No messages found", { status: 404 });
  }

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const result = streamText({
        model: google("gemini-2.5-flash"),
        system: SYSTEM_PROMPT,
        messages: convertToModelMessages(messages),
        tools,

        stopWhen: stepCountIs(10),
        async onFinish() {
          if (!chat?.title) {
            const title = await generateTitleFromUserMessage({ message });
            await updateChat(id, { title });
            writer.write({
              type: "data-title",
              data: title,
              transient: true,
            });
          }
        },
      });

      writer.merge(
        result.toUIMessageStream({
          generateMessageId: generateUUID,
          async onFinish({ responseMessage }) {
            await saveMessage(id, responseMessage);
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
