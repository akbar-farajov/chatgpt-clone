import { Provider } from "@ai-sdk-tools/store";
import { Chat } from "./components";
import { Header, HeaderLeft } from "../components";

export default async function Home() {
  return (
    <>
      <Header leftContent={<HeaderLeft title="Chat" />} />
      <Provider key="home">
        <Chat />
      </Provider>
    </>
  );
}
