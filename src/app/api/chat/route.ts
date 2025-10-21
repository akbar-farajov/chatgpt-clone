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

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { message, id }: { message: UIMessage; id: number } = await req.json();

  await saveMessage(id, message);
  console.log("message saved");
  const chat = await getChatById(id);

  const messages = await getMessagesByChatId(id);
  if (!messages) {
    return new Response("No messages found", { status: 404 });
  }
  console.log("messages fetched");
  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const result = streamText({
        model: google("gemini-2.5-flash"),
        messages: convertToModelMessages(messages),
        async onFinish(result) {
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

      result.consumeStream();
      console.log("stream consumed");
      writer.merge(
        result.toUIMessageStream({
          async onFinish({ responseMessage }) {
            await saveMessage(id, responseMessage);
          },
        })
      );
    },
  });
  console.log("stream created");
  return createUIMessageStreamResponse({ stream });
}
