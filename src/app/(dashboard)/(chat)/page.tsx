import { Chat } from "./components";
import { Provider } from "@ai-sdk-tools/store";

export default async function Home() {
  return (
    <Provider>
      <Chat initialMessages={[]} />
    </Provider>
  );
}
