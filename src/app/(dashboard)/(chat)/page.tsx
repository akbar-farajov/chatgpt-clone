import { Provider } from "@ai-sdk-tools/store";
import { Chat } from "./components";
import { ChatHeader } from "./components/chat-header";

export default async function Home() {
  return (
    <>
      <Provider key="home">
        <Chat />
      </Provider>
    </>
  );
}
