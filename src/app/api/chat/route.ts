import {
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
} from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { message, id }: { message: UIMessage; id: string } = await req.json();

  await saveMessage(id, message);
  const chat = await getChatById(id);

  const messages = await getMessagesByChatId(id);
  if (!messages) {
    return new Response("No messages found", { status: 404 });
  }

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const result = streamText({
        model: google("gemini-2.5-flash"),
        messages: convertToModelMessages(messages),
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
          async onFinish({ responseMessage }) {
            await saveMessage(id, responseMessage);
          },
        })
      );
    },
  });
  return createUIMessageStreamResponse({
    stream,
  });
}
