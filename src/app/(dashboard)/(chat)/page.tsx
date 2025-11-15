import { Provider } from "@ai-sdk-tools/store";
import { Chat } from "./components";

export default async function Home() {
  return (
    <>
      <Provider key="home">
        <Chat />
      </Provider>
    </>
  );
}
