import { cookies } from "next/headers";
import { Chat } from "./components";
import { Provider } from "@ai-sdk-tools/store";

export default async function Home() {
  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

  return (
    <Provider>
      <Chat initialMessages={[]} initialModel={modelIdFromCookie?.value} />
    </Provider>
  );
}
