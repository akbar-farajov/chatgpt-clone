import { Provider } from "@ai-sdk-tools/store";
import { Chat } from "./components";
import { ChatHeader } from "./components/chat-header";

export default async function Home() {
  return (
    <>
      <ChatHeader />
      <Provider key="home">
        <Chat />
      </Provider>
    </>
  );
}
